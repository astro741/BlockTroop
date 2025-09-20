import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHOC, CustomInput, CustomButton } from '../components';
import Toast from "../components/Toast/MM"
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const connectWallet = () => setWalletModalVisible(true);

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 });

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate('/create-battle'), 8000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  // useEffect(() => {
  //   const checkForPlayerToken = async () => {
  //     const playerExists = await contract.isPlayer(walletAddress);
  //     const playerTokenExists = await contract.isPlayerToken(walletAddress);

  //     if (playerExists && playerTokenExists) {
  //       navigate('/create-battle');
  //     }
  //   };

  //   if (contract) checkForPlayerToken();
  // }, [contract, walletAddress]);

  // useEffect(() => {
  //   if (gameData.activeBattle) {
  //     navigate(`/battle/${gameData.activeBattle.name}`);
  //   }
  // }, [gameData]);


  return (
    <div className="flex flex-col">
      {/* <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        /> */}
      <Toast
        isOpen={walletModalVisible}
        setIsOpen={setWalletModalVisible}
      >
      </Toast>
      <CustomButton
        title="Connect Wallet"
        handleClick={()=>{connectWallet()}}
        restStyles="mt-2"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    THE FUTURE OF BROWSER-BASED WEB3 FPS
  </>,
  <>
    Connect your wallet to start playing the ultimate Web3 Shooter Game
  </>
);
