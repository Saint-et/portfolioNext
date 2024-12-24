import * as Phaser from 'phaser';
import background from '@/public/assets/gameComponents/backgrounds/8-bit-graphics-pixels-scene-with-house-trees2.jpg';
import wereWolf from '@/public/assets/gameComponents/characters/Black_Werewolf/Idle.png';
import wereWolfRun from '@/public/assets/gameComponents/characters/Black_Werewolf/Run.png';
import wereWolfAttack1 from '@/public/assets/gameComponents/characters/Black_Werewolf/Attack_1.png';
import wereWolfJump from '@/public/assets/gameComponents/characters/Black_Werewolf/Jump.png';
import menuSong from '@/public/assets/gameComponents/music/button-124476.mp3';


let character: any
let cursors: any
let attackKeyPressed = false;


export default class GameScene extends Phaser.Scene {


    private mySound!: Phaser.Sound.BaseSound; // Déclaration de la propriété

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Code de préchargement des ressources
        this.load.audio('mySound', menuSong);
        this.load.image('background', background.src);
        this.load.spritesheet('character', wereWolf.src, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('characterRun', wereWolfRun.src, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('characterAttack1', wereWolfAttack1.src, { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('characterJump', wereWolfJump.src, { frameWidth: 128, frameHeight: 128 });
    }

    // Fonction de création des éléments du jeu
    create() {
        // Code de création des éléments du jeu
        const windowWidth = this.sys.game.config.width as number;
        const windowHeight = this.sys.game.config.height as number;
        
        this.mySound = this.sound.add('mySound', { loop: false });


        const background = this.add.image(0, 0, 'background').setOrigin(0);
        background.setScale(this.cameras.main.width / background.width, this.cameras.main.height / background.height);

        const playButtonLeave = this.add.text(windowWidth * 0.95, windowHeight * 0.05, 'Leave', { fontSize: '34px', color: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        playButtonLeave.setOrigin(0.5);
        playButtonLeave.setInteractive();

        // Ajoute un événement de clic au bouton "Jouer"
        playButtonLeave.on('pointerdown', () => {
            this.mySound.play();
            this.scene.start('MenuScene');
        });

        // Animation lorsqu'on survole le bouton
        playButtonLeave.on('pointerover', () => {
            playButtonLeave.setScale(1.2); // Augmente la taille du bouton
        });

        // Animation lorsqu'on quitte le bouton
        playButtonLeave.on('pointerout', () => {
            playButtonLeave.setScale(1)
        });

        // Création du personnage
        character = this.physics.add.sprite(windowWidth * 0.5, windowHeight * 0.5, 'character'); // Position initiale du personnage
        character.setCollideWorldBounds(true);

        character.setScale(1.2);

        // Ajouter une animation immobile
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 7 }), // Utiliser la première frame de l'image
            frameRate: 13, // Vitesse de l'animation (1 frame par seconde)
            repeat: -1 // Répéter l'animation en boucle
        });

        // Ajouter une animation Run
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('characterJump', { start: 0, end: 10 }), // Utiliser la première frame de l'image
            frameRate: 13, // Vitesse de l'animation (1 frame par seconde)
            repeat: -1 // Répéter l'animation en boucle
        });

        // Ajouter une animation Run
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('characterRun', { start: 0, end: 8 }), // Utiliser la première frame de l'image
            frameRate: 13, // Vitesse de l'animation (1 frame par seconde)
            repeat: -1 // Répéter l'animation en boucle
        });

        // Ajouter une animation characterAttack1
        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('characterAttack1', { start: 0, end: 5 }), // Utiliser la première frame de l'image
            frameRate: 13, // Vitesse de l'animation (1 frame par seconde)
            repeat: -1 // Répéter l'animation en boucle
        });

        // Commencer l'animation immobile
        character.anims.play('idle');

        cursors = this.input.keyboard?.createCursorKeys();

    }

    update() {
        // Code de mise à jour de l'état du jeu
        if (cursors.right.isDown) {
            character.setVelocityX(600);
            character.setFlipX(false);
            if (character.anims.currentAnim.key === 'idle') {
                character.anims.play('run');
            }
        } else if (cursors.left.isDown) {
            character.setVelocityX(-600);
            character.setFlipX(true);
            if (character.anims.currentAnim.key === 'idle') {
                character.anims.play('run');
            }
        } else {
            character.setVelocityX(0);
            if (character.anims.currentAnim.key === 'run') {
                character.anims.stop('run');
                character.anims.play('idle');
            }
        }

        if (cursors.up.isDown && character.body.onFloor()) {
            character.setVelocity(0, -1500);
            character.anims.play('jump');
        } else if (character.anims.currentAnim.key === 'jump' && character.body.onFloor()) {
            character.anims.stop('jump');
            character.anims.play('idle');
        }

        if (cursors.space.isDown && !attackKeyPressed && character.anims.currentAnim.key !== 'jump') {
            attackKeyPressed = true; // Indique que la touche a été enfoncée pour la première fois
            character.anims.play('attack1');
        } else if (cursors.space.isUp && attackKeyPressed) {
            // Arrête l'animation d'attaque lorsque la touche est relâchée
            character.anims.stop('attack1');
            character.anims.play('idle');
            attackKeyPressed = false; // Réinitialise l'indicateur
        }
    }
}