import * as Phaser from 'phaser';
import background from '@/public/assets/gameComponents/backgrounds/2151121007.jpg';
import menuSong from '@/public/assets/gameComponents/music/button-124476.mp3';
import menuSongBackground from '@/public/assets/gameComponents/music/the-final-boss-battle-158700.mp3';
import wolfCry from '@/public/assets/gameComponents/music/wolf-howling-140235.mp3';



export default class MenuScene extends Phaser.Scene {
    private mySound!: Phaser.Sound.BaseSound; // Déclaration de la propriété
    private backgroundMusic!: Phaser.Sound.BaseSound; // Déclaration de la propriété
    private wolfCry!: Phaser.Sound.BaseSound; // Déclaration de la propriété

    leaveGame!: Function; // Déclarez leaveGame comme une fonction
    userPseudo!: string;  // Déclarez userPseudo comme une chaîne
    userLevel!: number;   // Déclarez userLevel comme un nombre
    userImg!: string;     // Déclarez userImg comme une chaîne

    constructor() {
        super({ key: 'MenuScene' });
    }

    init(data: any) {
        this.leaveGame = data.leaveGame;
        this.userPseudo = data.userPseudo;
        this.userLevel = data.userLevel;
        this.userImg = data.userImg
    }

    preload() {
        // Code de préchargement des ressources
        this.load.image('profileImage', this.userImg);
        this.load.image('backgroundMenuScene', background.src);
        this.load.audio('mySound', menuSong);
        this.load.audio('mySoundBackground', menuSongBackground);
        this.load.audio('wolfCry', wolfCry);
    }

    create() {
        const windowWidth = this.sys.game.config.width as number;
        const windowHeight = this.sys.game.config.height as number;

        // Écoutez l'événement de redimensionnement de la fenêtre
        this.scale.on('resize', this.resizeGame, this);
        this.mySound = this.sound.add('mySound', { loop: false });
        this.wolfCry = this.sound.add('wolfCry', { loop: false });

        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying) {
            this.backgroundMusic = this.sound.add('mySoundBackground');
            this.backgroundMusic.play({ loop: true });
        }



        // Code de création des éléments du jeu
        const background = this.add.image(0, 0, 'backgroundMenuScene').setOrigin(0);
        background.setScale(this.cameras.main.width / background.width, this.cameras.main.height / background.height);

        // Dans la fonction create de votre scène
        const profileImage = this.add.sprite(windowWidth * 0.1, windowHeight * 0.15, 'profileImage')

        const borderRadius = 70;
        const maskWidth = 140; // Largeur du masque
        const maskHeight = 140;
        // Calculer les coordonnées pour le masque d'arrondi en fonction de la position du sprite
        const maskX = profileImage.x - maskWidth / 2;
        const maskY = profileImage.y - maskHeight / 2;

        // Calculer l'échelle pour imiter "object-fit: cover"
        const scaleX = maskWidth / profileImage.width;
        const scaleY = maskHeight / profileImage.height;
        const scale = Math.max(scaleX, scaleY); // Choisir l'échelle la plus grande pour couvrir la zone

        profileImage.setScale(scale); // Appliquer l'échelle
        profileImage.setPosition(maskX + maskWidth / 2, maskY + maskHeight / 2); // Centrer l'image dans le rectangle

        // Créer le masque d'arrondi
        const maskGraphics = this.make.graphics();
        maskGraphics.fillStyle(0xffffff); // Couleur du masque (blanc opaque)
        maskGraphics.fillRoundedRect(maskX, maskY, maskWidth, maskHeight, borderRadius);
        const mask = maskGraphics.createGeometryMask();

        // Appliquer le masque à l'image
        profileImage.setMask(mask);

        const pseudoUser = this.add.text(windowWidth * 0.1, windowHeight * 0.3, this.userPseudo, { fontSize: '34px', color: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        pseudoUser.setOrigin(0.5);

        const levelUser = this.add.text(windowWidth * 0.1, windowHeight * 0.35, `lvl:  ${this.userLevel}`, { fontSize: '34px', color: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        levelUser.setOrigin(0.5);

        const titleMain = this.add.text(windowWidth * 0.5, windowHeight * 0.2, 'Werewolf Attack!', { fontSize: '84px', color: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        titleMain.setOrigin(0.5);

        const playButton = this.add.text(windowWidth * 0.5, windowHeight * 0.4, 'Play', { fontSize: '54px', color: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        playButton.setOrigin(0.5);
        playButton.setInteractive();

        // Animation lorsqu'on survole le bouton
        playButton.on('pointerover', () => {
            this.mySound.play();
            playButton.setScale(1.2); // Augmente la taille du bouton
        });

        // Animation lorsqu'on quitte le bouton
        playButton.on('pointerout', () => {
            playButton.setScale(1); // Rétablit la taille normale du bouton
        });

        // Ajoute un événement de clic au bouton "Jouer"
        playButton.on('pointerdown', () => {
            this.wolfCry.play(); // Démarrer la scène principale du jeu
            this.scene.start('GameScene');
        });

        const playButtonOption = this.add.text(windowWidth * 0.5, windowHeight * 0.5, 'Option', { fontSize: '54px', color: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        playButtonOption.setOrigin(0.5);
        playButtonOption.setInteractive();

        // Animation lorsqu'on survole le bouton
        playButtonOption.on('pointerover', () => {
            this.mySound.play();
            playButtonOption.setScale(1.2); // Augmente la taille du bouton
        });

        // Animation lorsqu'on quitte le bouton
        playButtonOption.on('pointerout', () => {
            playButtonOption.setScale(1); // Rétablit la taille normale du bouton
        });

        const playButtonLeave = this.add.text(windowWidth * 0.5, windowHeight * 0.6, 'Leave game', { fontSize: '54px', color: '#fff', fontFamily: 'Honk', fontStyle: 'bold', align: 'center' });
        playButtonLeave.setOrigin(0.5);
        playButtonLeave.setInteractive();

        // Animation lorsqu'on survole le bouton
        playButtonLeave.on('pointerover', () => {
            this.mySound.play();
            playButtonLeave.setScale(1.2); // Augmente la taille du bouton
        });

        // Animation lorsqu'on quitte le bouton
        playButtonLeave.on('pointerout', () => {
            playButtonLeave.setScale(1); // Rétablit la taille normale du bouton
        });

        // Ajoute un événement de clic au bouton "Jouer"
        playButtonLeave.on('pointerdown', () => {
            this.mySound.play();
            this.leaveGame();
        });


    }

    resizeGame() {
        const width = this.scale.parentSize.width;
        const height = this.scale.parentSize.height;

        // Redimensionnez la scène du jeu en fonction de la taille de la fenêtre
        this.cameras.resize(width, height);
    }

    update() {
        // Code de mise à jour de l'état du jeu

    }
}