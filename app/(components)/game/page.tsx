"use client";

import React, { useEffect } from "react";
import * as Phaser from "phaser";
import GameScene from "./(components)/game-scene";
import MenuScene from "./(components)/menu-scene";

interface MyGameComponentBetaProps {
  onClick: () => void;
  userPseudo: string;
  userImg: string;
  userLevel: number;
}

const MyGameComponentBeta: React.FC<MyGameComponentBetaProps> = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Créer une instance de jeu Phaser uniquement lors de la première montée du composant
      const config = {
        type: Phaser.AUTO,
        parent: "phaser-container",
        scale: {
          //mode: Phaser.Scale.ScaleModes.RESIZE,
          width: 1500,
          height: 700,
        },
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 4000, x: 0 },
            //debug: true,
          },
        },
        scene: [MenuScene, GameScene],
      };

      const game = new Phaser.Game(config);
      game.scene.start("MenuScene", {
        leaveGame: () => {
          props.onClick();
        },
        userPseudo: props.userPseudo,
        userLevel: props.userLevel,
        userImg: props.userImg,
      });

      //// Écouteur d'événement pour le redimensionnement de la fenêtre
      //window.addEventListener('resize', function () {
      //    // Mettre à jour les dimensions du jeu
      //    game.resize(window.innerWidth, window.innerHeight);
      //    // Mettre à jour les dimensions de la caméra
      //    if (game.scene.scenes.length > 0) {
      //        const scene = game.scene.scenes[0];
      //        scene.cameras.main.setSize(window.innerWidth, window.innerHeight);
      //    }
      //});

      // Fonction de nettoyage pour détruire l'instance de jeu lorsque le composant est démonté
      return () => {
        game.destroy(true); // true pour nettoyer également le contexte WebGL
      };
    }
  }, []);

  return (
    <>
      <div id="phaser-container"></div>
    </>
  );
};

export default MyGameComponentBeta;
