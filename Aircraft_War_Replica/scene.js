import * as PIXI from 'pixi.js'
import { screenPos,changingValues,Gametexture,MAXVALUES,States,STATEMACHINE,controllingValues, SceneConatiner} from "./resource.js";
import { ObjectArray,ObjectSizes } from "./bullets.js";
import { MusicProps } from "./audio.js";
import { helper } from "./helper.js";
import { handle, leaderboardEntry, slider } from "./leaderboard.js";
var leaderboardObj = new leaderboardEntry();
var helperclass = new helper();
var explosion;
var playButton;
var playText;
var bgBack;
var bgMiddle;
var bgFront;
var restart;
var restartMsg;
var finalScore;
var finalLightYear;
var scorePanel;
var heart;
var heartDrop;
var multiBulletsIcon;scoreboard
var multiBullets;
var rocket;
var levelupText;
var lightYearsText;
var finallevel;
var scoreboard;
var scoreText;
var Contemitter;
var musicButton;
var soundButton;
var musicClosedButton;
var soundClosedButton;
var howToplayButton;
var howToplayText;
var howToplayPanel;
var instruction;
var backButton;
var leaderboard;
var leaderboardText;
var leaderboardBG;
var lbBG;
var backMainScene;

var healthbar;
var outerbar;
var innerbar;
var lbMask;
var AllTimebutton;
var Todaybutton;
var AllTimebuttonText;
var TodaybuttonText;

var style; 
var style3;
var style2;
var style4;

export var GameTextStyles = { 
  style, 
  style3,
  style2,
  style4,
};

export var lbPanelObjects = [];

export var players = [];
export var PlayerRanks = [];
export var playerNames = [];
export var playerScores = [];
export var GameObjects = {
  explosion,
  playButton,
  playText,
  bgBack,
  bgMiddle,
  bgFront,
  restart,
  restartMsg,
  finalScore,
  finalLightYear,
  scorePanel,
  heart,
  heartDrop,
  multiBulletsIcon,
  multiBullets,
  rocket,
  levelupText,
  lightYearsText,
  finallevel,
  scoreboard,
  scoreText,
  Contemitter,
  musicButton,
  soundButton,
  musicClosedButton,
  soundClosedButton,
  howToplayButton,
  howToplayText,
  howToplayPanel,
  instruction,
  backButton,
  healthbar,
  outerbar,
  innerbar,
  leaderboard,
  leaderboardText,
  leaderboardBG,
  lbBG,
  lbMask,
  AllTimebutton,
  AllTimebuttonText,
  Todaybutton,
  TodaybuttonText,
  backMainScene,
};

export class SceneObjects{

TextStylesdefinations()
{
    GameTextStyles.style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 100 * changingValues.customiser,
});
GameTextStyles.style3 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 100 * changingValues.customiser,
    fill: ['#ffffff', '#00ff99'],
});

GameTextStyles.style2 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 50 * changingValues.customiser,
});

GameTextStyles.style4 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 75 * changingValues.customiser,
    fill: ['#ffffff'],
    wordWrap: true,
    wordWrapWidth: 480,
    align : 'center',
});
}
    GameObjectsTextures()
    {

    GameObjects.playButton = helperclass.DisplayTexture(Gametexture.button, screenPos.screenX / 2, screenPos.screenY / 2, 0.8 * changingValues.customiser, 0.5);

    GameObjects.playText = helperclass.DisplayText("PLAY", screenPos.screenX / 2, screenPos.screenY / 2, 0.5, GameTextStyles.style);

    GameObjects.howToplayButton = helperclass.DisplayTexture(Gametexture.button,screenPos.screenX/2,screenPos.screenY/3,0.6 * changingValues.customiser,0.5);

    GameObjects.leaderboard = helperclass.DisplayTexture(Gametexture.button,screenPos.screenX/2,screenPos.screenY/2 + screenPos.screenY/6,0.6 * changingValues.customiser,0.5);
    GameObjects.leaderboardText = helperclass.DisplayText("Leaderboard",GameObjects.leaderboard.x,GameObjects.leaderboard.y,0.5,GameTextStyles.style2);

    GameObjects.howToplayText = helperclass.DisplayText("How To Play?",screenPos.screenX/2,screenPos.screenY/3,0.5,GameTextStyles.style2);


    GameObjects.musicButton = helperclass.DisplayTexture(Gametexture.music,screenPos.screenX/2 - (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4,1 * changingValues.customiser,0.5);


    GameObjects.soundButton = helperclass.DisplayTexture(Gametexture.sound,screenPos.screenX/2 + (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4,1 * changingValues.customiser,0.5);


    GameObjects.musicClosedButton = helperclass.DisplayTexture(Gametexture.musicClose,screenPos.screenX/2 - (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4,1 * changingValues.customiser,0.5);

    GameObjects.musicClosedButton.visible = false;
    
    GameObjects.soundClosedButton = helperclass.DisplayTexture(Gametexture.soundClose,screenPos.screenX/2 + (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4,1 * changingValues.customiser,0.5);

    GameObjects.soundClosedButton.visible = false;

    GameObjects.howToplayPanel = helperclass.DisplayTexture(Gametexture.bgback,screenPos.screenX/2,screenPos.screenY/2,0.6 * changingValues.customiser,0.5);
    GameObjects.howToplayPanel.visible = false;


    GameObjects.backButton = helperclass.DisplayTexture(Gametexture.back,screenPos.screenX/2 - (400 * changingValues.customiser),screenPos.screenY/2 - (400 * changingValues.customiser),0.4 * changingValues.customiser,0.5);
    GameObjects.backButton.visible = false;


    GameObjects.instruction = helperclass.DisplayText("Move rocket left and right\nto attack other\nspaceships.\n\nScore as many points as possible.\n\nBe alive for as long as you can.",screenPos.screenX/2,screenPos.screenY/2 ,0.5,GameTextStyles.style4);
    GameObjects.instruction.visible = false;
    
    GameObjects.bgBack = helperclass.DisplayTilling(Gametexture.bgback, screenPos.screenX, screenPos.screenY);

    GameObjects.bgMiddle = helperclass.DisplayTilling(Gametexture.bgmiddle, screenPos.screenX, screenPos.screenY);

    GameObjects.bgFront = helperclass.DisplayTilling(Gametexture.bgfront, screenPos.screenX, screenPos.screenY);


    GameObjects.restart = helperclass.DisplayTexture(Gametexture.button, screenPos.screenX / 2, screenPos.screenY / 2, 0.8 * changingValues.customiser, 0.5);


    GameObjects.restartMsg = helperclass.DisplayText("REPLAY", screenPos.screenX / 2, screenPos.screenY / 2, 0.5, GameTextStyles.style);


    GameObjects.finalScore = helperclass.DisplayText(changingValues.score, screenPos.screenX / 2, screenPos.screenY / 4, 0.5, GameTextStyles.style);


    GameObjects.finalLightYear = helperclass.DisplayText(changingValues.lightYears, screenPos.screenX / 2, screenPos.screenY / 3, 0.5, GameTextStyles.style);


    GameObjects.rocket = helperclass.DisplayTexture(Gametexture.rocket, screenPos.screenX / 2, screenPos.screenY - (500 * changingValues.customiser), 0.05 * changingValues.customiser, 0.5);


    GameObjects.scorePanel = helperclass.DisplayTexture(Gametexture.scorePanel, screenPos.screenX / 2, screenPos.screenY, 1.1 * changingValues.customiser, 0.5);


    GameObjects.heart = helperclass.DisplayTexture(Gametexture.heart, GameObjects.scorePanel.x + (100 * changingValues.customiser), GameObjects.scorePanel.y - (200 * changingValues.customiser), 0.05 * changingValues.customiser, 0.5);
    GameObjects.heart.alpha = 0.3;


    GameObjects.heartDrop = helperclass.DisplayTexture(Gametexture.heart, GameObjects.heart.x, GameObjects.heart.y, 0.05 * changingValues.customiser, 0.5);

    GameObjects.heartDrop.visible = false;
    
    GameObjects.multiBulletsIcon = helperclass.DisplayTexture(Gametexture.multiBullets, GameObjects.scorePanel.x - (150 * changingValues.customiser), GameObjects.scorePanel.y - (200 * changingValues.customiser), 0.05 * changingValues.customiser, 0.5);
    GameObjects.multiBulletsIcon.alpha = 0.3;


    GameObjects.multiBullets = helperclass.DisplayTexture(Gametexture.multiBullets, GameObjects.heart.x - 100, GameObjects.heart.y, 0.05 * changingValues.customiser, 0.5);

    GameObjects.multiBullets.visible = false;

    GameObjects.levelupText = helperclass.DisplayText("Level UP",screenPos.screenX/2,screenPos.screenY/2,0.5,GameTextStyles.style3);

    GameObjects.levelupText.visible = false;

    GameObjects.lightYearsText = helperclass.DisplayText(changingValues.lightYears, screenPos.screenX / 2, GameObjects.heart.y - (70 * changingValues.customiser), 0.5, GameTextStyles.style2);


    GameObjects.finallevel = helperclass.DisplayText(changingValues.level, screenPos.screenX / 2,screenPos.screenY/5, 0.5, GameTextStyles.style);

    
    GameObjects.explosion = helperclass.ExplosionAnimation();


    GameObjects.scoreboard = helperclass.DisplayTexture(Gametexture.button, 120 * changingValues.customiser, 80 * changingValues.customiser, 0.3 * changingValues.customiser, 0.5);


    GameObjects.scoreText = helperclass.DisplayText(changingValues.score, (120 * changingValues.customiser),(80 * changingValues.customiser), 0.5, GameTextStyles.style2);
 

    GameObjects.healthbar = new PIXI.Container();
    GameObjects.healthbar.position.set(0, 0);

   
    GameObjects.outerbar = new PIXI.Graphics();
    GameObjects.outerbar.beginFill(0x00FF00);
    GameObjects.healthbar.outer = GameObjects.outerbar;
    

    GameObjects.innerbar = new PIXI.Graphics();
    GameObjects.innerbar.beginFill(0xFFFFFF);
    GameObjects.innerbar.drawRect(GameObjects.healthbar.outer.position.x, GameObjects.healthbar.outer.position.y, 100, 10);
    GameObjects.innerbar.endFill();

    GameObjects.outerbar.drawRect(0, 0, 100, 10);
    GameObjects.outerbar.endFill();

    GameObjects.healthbar.outer.position.x = screenPos.screenX/2 - GameObjects.healthbar.outer.width/2;
    GameObjects.healthbar.outer.position.y = GameObjects.scorePanel.y - (120 * changingValues.customiser);


    GameObjects.innerbar.x = GameObjects.outerbar.x;
    GameObjects.innerbar.y = GameObjects.outerbar.y;

    GameObjects.lbMask = new PIXI.Graphics();
    GameObjects.lbMask.beginFill(0x9999ff,1);
    GameObjects.lbMask.drawRect(0,0,1000,400)
    GameObjects.lbMask.endFill();
    GameObjects.lbMask.x = 0;
    GameObjects.lbMask.y = 100;
GameObjects.Todaybutton = helperclass.DisplayTexture(Gametexture.button,screenX/3,10,0.5 * changingValues.customiser,0.5);
    GameObjects.TodaybuttonText = helperclass.DisplayText("Today",GameObjects.Todaybutton.x,GameObjects.Todaybutton.y,0.5,GameTextStyles.style);
    GameObjects.AllTimebutton = helperclass.DisplayTexture(Gametexture.button,screenPos.screenX/2,screenPos.screenY/2,0.5 * changingValues.customiser,0.5);   
    GameObjects.AllTimebuttonText = helperclass.DisplayText("All Time",screenPos.screenX/2,screenPos.screenY/2,0.5,GameTextStyles.style2);
    
    GameObjects.backMainScene = helperclass.DisplayTexture(Gametexture.back,10,10,0.5 * changingValues.customiser,0.5);
    
    GameObjects.leaderboardBG = helperclass.DisplayTexture(Gametexture.leaderboard,screenPos.screenX,screenPos.screenY,0.5 * changingValues.customiser,0.5);
    
    for(let i = 0;i < 10;i++)
    {
        lbPanelObjects[i] = leaderboardObj.displayLBE(screenPos.screenX/2,screenPos.screenY/2,1 * changingValues.customiser,0.3 * changingValues.customiser,1,"sss",100);
    }

    
    }

    ObjectResponsiveness()
{

this.TextStylesdefinations();
    GameObjects.playButton.scale.set(0.8 * changingValues.customiser);
    GameObjects.playButton.position.set(screenPos.screenX / 2, screenPos.screenY / 2);
   
    GameObjects.playText.position.set(screenPos.screenX / 2, screenPos.screenY / 2);

    GameObjects.howToplayButton.scale.set(0.6 * changingValues.customiser);
    GameObjects.howToplayButton.position.set(screenPos.screenX/2,screenPos.screenY/3);

    GameObjects.howToplayText.position.set(screenPos.screenX/2,screenPos.screenY/3);
    GameObjects.howToplayText.style =  GameTextStyles.style2;

    GameObjects.leaderboard.position.set(screenPos.screenX/2,screenPos.screenY/2 + screenPos.screenY/6);
    GameObjects.leaderboard.scale.set(0.6 * changingValues.customiser);

    GameObjects.leaderboardText.position.set(GameObjects.leaderboard.x,GameObjects.leaderboard.y);
    GameObjects.leaderboardText.style = GameTextStyles.style2;

    GameObjects.musicButton.scale.set(1 * changingValues.customiser);
    GameObjects.musicButton.position.set(screenPos.screenX/2 - (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4);

    GameObjects.soundButton.scale.set(1 * changingValues.customiser);
    GameObjects.soundButton.position.set(screenPos.screenX/2 + (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4);

    GameObjects.musicClosedButton.scale.set(1 * changingValues.customiser);
    GameObjects.musicClosedButton.position.set(screenPos.screenX/2 - (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4);

    GameObjects.soundClosedButton.scale.set(1 * changingValues.customiser);
    GameObjects.soundClosedButton.position.set(screenPos.screenX/2 + (screenPos.screenX/3 * changingValues.customiser),screenPos.screenY - screenPos.screenY/4);
    
    GameObjects.howToplayPanel.scale.set(0.6 * changingValues.customiser);
    GameObjects.howToplayPanel.position.set(screenPos.screenX/2,screenPos.screenY/2);

    GameObjects.backButton.scale.set(0.4 * changingValues.customiser);
    GameObjects.backButton.position.set(screenPos.screenX/2 - (400 * changingValues.customiser),screenPos.screenY/2 - (400 * changingValues.customiser));
    
    GameObjects.instruction.position.set(screenPos.screenX/2,screenPos.screenY/2);
    GameObjects.instruction.style = GameTextStyles.style4;

    GameObjects.bgBack.width = screenPos.screenX;
    GameObjects.bgBack.height = screenPos.screenY;

    GameObjects.bgMiddle.width = screenPos.screenX; 
    GameObjects.bgMiddle.height = screenPos.screenY;

    GameObjects.bgFront.width = screenPos.screenX; 
    GameObjects.bgFront.height = screenPos.screenY;

    GameObjects.restart.scale.set(0.8 * changingValues.customiser);
    GameObjects.restart.position.set(screenPos.screenX / 2, screenPos.screenY / 2);
    
    GameObjects.restartMsg.position.set(screenPos.screenX / 2, screenPos.screenY / 2);
 
    GameObjects.finalScore.position.set(screenPos.screenX / 2, screenPos.screenY / 4);

    GameObjects.finalLightYear.position.set(screenPos.screenX / 2, screenPos.screenY / 3);

    GameObjects.rocket.scale.set(0.05 * changingValues.customiser);
    GameObjects.rocket.position.set( screenPos.screenX / 2, screenPos.screenY - (500 * changingValues.customiser));

    // GameObjects.leaderboardPanel.position.set(screenPos.screenX/2,screenPos.screenY/2);
    // GameObjects.leaderboardPanel.scale.set(2 * changingValues.customiser,1.5 * changingValues.customiser);
    GameObjects.scorePanel.scale.set(1.1 * changingValues.customiser);
    GameObjects.scorePanel.position.set(screenPos.screenX / 2, screenPos.screenY);

    GameObjects.heart.scale.set( 0.05 * changingValues.customiser);
    GameObjects.heart.position.set(GameObjects.scorePanel.x + (100 * changingValues.customiser), GameObjects.scorePanel.y - (200 * changingValues.customiser));

    GameObjects.heartDrop.scale.set(0.05 * changingValues.customiser);
    
    GameObjects.multiBulletsIcon.scale.set(0.05 * changingValues.customiser);
    GameObjects.multiBulletsIcon.position.set( GameObjects.scorePanel.x - (150 * changingValues.customiser), GameObjects.scorePanel.y - (200 * changingValues.customiser));

    GameObjects.multiBullets.scale.set( 0.05 * changingValues.customiser);

    GameObjects.levelupText.position.set(screenPos.screenX/2,screenPos.screenY/2);

    GameObjects.lightYearsText.position.set(screenPos.screenX / 2, GameObjects.heart.y - (70 * changingValues.customiser));

    GameObjects.finallevel.position.set(screenPos.screenX / 2,screenPos.screenY/5);
    
    GameObjects.scoreboard.scale.set(0.3 * changingValues.customiser);
    GameObjects.scoreboard.position.set( 120 * changingValues.customiser, 80 * changingValues.customiser)

    GameObjects.scoreText.position.set((120 * changingValues.customiser),(80 * changingValues.customiser));

    GameObjects.healthbar .outer.position.x = screenPos.screenX/2 - GameObjects.healthbar .outer.width/2;
    GameObjects.healthbar .outer.position.y = GameObjects.scorePanel.y - (120 * changingValues.customiser);

    GameObjects.innerbar.x = GameObjects.outerbar.x;
    GameObjects.innerbar.y = GameObjects.outerbar.y;
     
    GameObjects.playText.style = GameTextStyles.style;

    GameObjects.restartMsg.style = GameTextStyles.style;

    GameObjects.finalScore.style = GameTextStyles.style;

    GameObjects.finalLightYear.style = GameTextStyles.style;

    GameObjects.levelupText.style = GameTextStyles.style3;

    GameObjects.lightYearsText.style = GameTextStyles.style2;

    GameObjects.finallevel.style = GameTextStyles.style;

    GameObjects.scoreText.style = GameTextStyles.style2;

    GameObjects.leaderboardBG.position.set(screenPos.screenX/2,screenPos.screenY/2);

    GameObjects.leaderboardBG.scale.set(2.2 * changingValues.customiser,1.5 * changingValues.customiser);
    GameObjects.Todaybutton.position.set(screenPos.screenX/3,screenPos.screenY/5);
    GameObjects.Todaybutton.scale.set(0.3 * changingValues.customiser); 
    GameObjects.AllTimebutton.position.set(GameObjects.Todaybutton.x + screenPos.screenX/4,screenPos.screenY/5);
    GameObjects.AllTimebutton.scale.set(0.3 * changingValues.customiser);
    GameObjects.TodaybuttonText.position.set(GameObjects.Todaybutton.x,GameObjects.Todaybutton.y);
    GameObjects.TodaybuttonText.style = GameTextStyles.style2;

    GameObjects.AllTimebuttonText.position.set(GameObjects.AllTimebutton.x,GameObjects.AllTimebutton.y);
    GameObjects.AllTimebuttonText.style = GameTextStyles.style2;

    GameObjects.backMainScene.position.set(screenPos.screenX/10,screenPos.screenY/18);
    GameObjects.backMainScene.scale.set(0.4 * changingValues.customiser);
    for(let i = 0;i < 10;i++)
    {
        var posx;
        var posy;
        if(i == 0)
        {
            posx = screenPos.screenX - screenPos.screenX/1.9;
            posy = GameObjects.Todaybutton.y + screenPos.screenY/8;
        }
        else
        {
            posx = lbPanelObjects[i - 1].x;
            posy = lbPanelObjects[i - 1].y + 150 * changingValues.customiser;
        }
        lbPanelObjects[i].position.set(posx,posy);
        lbPanelObjects[i].scale.set(0.5 * changingValues.customiser);
        lbPanelObjects[i].img.scale.set(0.1 * changingValues.customiser);
        lbPanelObjects[i].rank.style = GameTextStyles.style;
        lbPanelObjects[i].name.style = GameTextStyles.style;
        lbPanelObjects[i].score.style = GameTextStyles.style;
        lbPanelObjects[i].rank.position.set(lbPanelObjects[i].x - 400 * changingValues.customiser,lbPanelObjects[i].y);
        lbPanelObjects[i].img.position.set(lbPanelObjects[i].rank.position.x + 100 * changingValues.customiser,lbPanelObjects[i].rank.position.y);
        lbPanelObjects[i].name.position.set(lbPanelObjects[i].img.position.x + 200 * changingValues.customiser,lbPanelObjects[i].rank.position.y);
        lbPanelObjects[i].score.position.set(lbPanelObjects[i].name.position.x + 400* changingValues.customiser,lbPanelObjects[i].rank.position.y);
    }
    slider.position.set(lbPanelObjects[0].score.x + 200 * changingValues.customiser,lbPanelObjects[0].y - 50 * changingValues.customiser);
    slider.height = GameObjects.leaderboardBG.height;
    // console.log(GameObjects.leaderboardBG.height);
    handle.position.set(5,0);
    GameObjects.lbMask.x = 0;
    GameObjects.lbMask.y =  GameObjects.leaderboardBG.y/2 + lbPanelObjects[9].y/2;
    SceneConatiner.leaderboardEntry.y = 0;

    // GameObjects.AllTimebuttonText.position.set(GameObjects.AllTimebutton.x,GameObjects.AllTimebutton.y);
    // GameObjects.AllTimebuttonText.style = GameTextStyles.style;
    for(let i = 0; i < ObjectSizes.bulletsSize;i++)
    {
        ObjectArray.bulletsObject[i].scale.set(0.06 * changingValues.customiser);
    }
    for(let i = 0; i < ObjectSizes.bulletsSize;i++)
    {
        ObjectArray.bossbullets[i].scale.set(0.06 * changingValues.customiser);
    }
    for(let i = 0; i < MAXVALUES.MAXNORMALSPACEOBJSIZE;i++)
    {
       ObjectArray.normalSpaceObject[i].scale.set(0.09 * changingValues.customiser);
    }
    for(let i = 0;i< MAXVALUES.MAXBOSSSPACEOBJSIZE;i++)
    {
        ObjectArray.bossSpaceObjects[i].scale.set(0.15 * changingValues.customiser);
    }
    for(let i = 0;i<MAXVALUES.MAXWALLERSPACEOBJSIZE;i++)
    {
        ObjectArray.wallerSpaceObjects[i].scale.set(0.15 * changingValues.customiser);
    }


}

collisionCheck(spaceObj, spaceObjSize, type) {
    var minRHealth = 0;
    var minHp = 0;
    var minEHealth = 0;
    switch (type) {
        case 1:
            minRHealth = 10;
            minHp = 10;
            minEHealth = 100;
            break;
        case 2:
            minRHealth = 30;
            minHp = 30;
            minEHealth = 2;
            break;
        case 3:
            minRHealth = 15;
            minHp = 15;
            minEHealth = 50;
    }

    for (let i = 0; i < spaceObjSize; i++) {
        if (helperclass.collisiondetection(spaceObj[i], GameObjects.rocket) && spaceObj[i].attack == true && States.currentState != STATEMACHINE.GAMESTATEMACHINE.GameOver) {
            spaceObj[i].attack = false;
            GameObjects.rocket.health -= minRHealth;
            if(controllingValues.isSoundClosed == false)
            {
                createjs.Sound.play("Fall",MusicProps.sfx);
            }
            GameObjects.healthbar.outer.width -= minHp;
        }
        for (let j = 0; j < ObjectSizes.bulletsSize; j++) {
            if (helperclass.collisiondetection(spaceObj[i], ObjectArray.bulletsObject[j]) && spaceObj[i].visible == true && States.currentState != STATEMACHINE.GAMESTATEMACHINE.GameOver && spaceObj[i].y > 1) {
                ObjectArray.bulletsObject[j].visible = false;
                spaceObj[i].health -= minEHealth;
                if (spaceObj[i].health <= 0) {
                    GameObjects.explosion.x = spaceObj[i].x;
                    GameObjects.explosion.y = spaceObj[i].y;
                    spaceObj[i].visible = false;
                    GameObjects.explosion.visible = true;
                    if(controllingValues.isSoundClosed == false)
                    {
                        createjs.Sound.play("explosion", MusicProps.sfx);
                    }
                    GameObjects.explosion.gotoAndPlay(0);
                    GameObjects.explosion.onComplete = function () {
                    GameObjects.explosion.visible = false;
                    }
                }
                changingValues.score += 1;
                GameObjects.scoreText.text = changingValues.score;
            }
        }
    }
}

}