import * as PIXI from 'pixi.js'
import { helper } from "./helper.js";
import { Emitter} from "./helper.js";
import { bullets,ObjectArray,ObjectSizes,SpaceObjectsTypes} from "./bullets.js";
import { enemies} from "./bullets.js";
import { changingValues, controllingValues, Gametexture, GameTimers, MAXVALUES,SceneConatiner, screenPos,STATEMACHINE, States } from "./resource.js";
import { audio,Musics,MusicProps,Sounds } from "./audio.js";
import { CanvasSize, isResized,canvas } from "./canvas.js";
import { leaderboardEntry, slider } from "./leaderboard.js";
import { SceneObjects,GameObjects, lbPanelObjects, players, playerNames, PlayerRanks, playerScores} from "./scene.js";

var helperclass = new helper();
var emitter = new Emitter();
var bulletsObj = new bullets();
var enemiesObj = new enemies();
var audioObj = new audio();
var canvasObj = new CanvasSize();
var sceneObj = new SceneObjects();
var leaderboardObj = new leaderboardEntry();

let w = canvas.width;
let h = canvas.height;

const app = new PIXI.Application({
    autoResize: true,
    backgroundColor: 0x000000,
    width: w,
    height: h,
    view: canvas
});

window.addEventListener('load',changeViewport);
window.addEventListener('resize',changeViewport);

function changeViewport()
{
    rendererSettings();
    canvasObj.ScreenCanvas();
}
document.body.appendChild(app.view);
States.currentState = STATEMACHINE.GAMESTATEMACHINE.MainMenu;

screenPos.screenX = app.renderer.view.width;
screenPos.screenY = app.renderer.view.height;

changingValues.customiser = screenPos.screenX / 30 * screenPos.screenY / 30 * (app.renderer.resolution * (1 / (screenPos.screenX + screenPos.screenY)));

controllingValues.isLevelUPDone = true;

OnGameLoaded();

controllingValues.isMusic = false;

onGameReady();

audioObj.handleLoad();
audioObj.init();

function OnGameLoaded() {

    SceneConatiner.mainmenuScene = new PIXI.Container();
    app.stage.addChild(SceneConatiner.mainmenuScene);

    SceneConatiner.gameScene = new PIXI.Container();
    app.stage.addChild(SceneConatiner.gameScene);
    SceneConatiner.gameScene.visible = false;

    SceneConatiner.gameoverScene = new PIXI.Container();
    app.stage.addChild(SceneConatiner.gameoverScene);
    SceneConatiner.gameoverScene.visible = false;

    SceneConatiner.leaderboardScene = new PIXI.Container();
    
    app.stage.addChild(SceneConatiner.leaderboardScene);
    SceneConatiner.leaderboardScene.visible = false;

    sceneObj.TextStylesdefinations();
    sceneObj.GameObjectsTextures();

    SceneConatiner.mainmenuScene.addChild(GameObjects.playButton);
    SceneConatiner.mainmenuScene.addChild(GameObjects.playText);  
    SceneConatiner.mainmenuScene.addChild(GameObjects.howToplayButton);
    SceneConatiner.mainmenuScene.addChild(GameObjects.howToplayText);
    SceneConatiner.mainmenuScene.addChild(GameObjects.musicButton);  
    SceneConatiner.mainmenuScene.addChild(GameObjects.soundButton); 
    SceneConatiner.mainmenuScene.addChild(GameObjects.musicClosedButton); 
    SceneConatiner.mainmenuScene.addChild(GameObjects.soundClosedButton);
    SceneConatiner.mainmenuScene.addChild(GameObjects.howToplayPanel); 
    SceneConatiner.mainmenuScene.addChild(GameObjects.leaderboard);
    SceneConatiner.mainmenuScene.addChild(GameObjects.leaderboardText);
    SceneConatiner.mainmenuScene.addChild(GameObjects.backButton);
    SceneConatiner.mainmenuScene.addChild(GameObjects.instruction);

    SceneConatiner.leaderboardPanel = new PIXI.Container();
    SceneConatiner.leaderboardEntry = new PIXI.Container(); 
    
    SceneConatiner.leaderboardScene.addChild(SceneConatiner.leaderboardPanel);
    SceneConatiner.leaderboardPanel.position.set(0,0);
    SceneConatiner.leaderboardPanel.width = screenPos.screenX/2;
    SceneConatiner.leaderboardPanel.height = screenPos.screenY/2;
    SceneConatiner.leaderboardPanel.anchor = 0.5;

    SceneConatiner.leaderboardPanel.addChild(GameObjects.leaderboardBG);
    SceneConatiner.leaderboardPanel.addChild(SceneConatiner.leaderboardEntry);
    SceneConatiner.leaderboardEntry.position.set(0,0);
    SceneConatiner.leaderboardEntry.width = screenPos.screenX/2;
    SceneConatiner.leaderboardEntry.height = SceneConatiner.leaderboardPanel.height - 200;
    SceneConatiner.leaderboardPanel.addChild(GameObjects.AllTimebutton);
    SceneConatiner.leaderboardPanel.addChild(GameObjects.AllTimebuttonText);
 
    SceneConatiner.leaderboardPanel.addChild(GameObjects.Todaybutton);
    SceneConatiner.leaderboardPanel.addChild(GameObjects.TodaybuttonText);
    leaderboardObj.sliderObj();
    SceneConatiner.leaderboardPanel.addChild(slider);
    for(let i = 0; i < 10;i++)
    {
        SceneConatiner.leaderboardEntry.addChild(lbPanelObjects[i]);
        SceneConatiner.leaderboardEntry.addChild(lbPanelObjects[i].img);
        SceneConatiner.leaderboardEntry.addChild(lbPanelObjects[i].name);
        SceneConatiner.leaderboardEntry.addChild(lbPanelObjects[i].rank);
        SceneConatiner.leaderboardEntry.addChild(lbPanelObjects[i].score);

    }
   SceneConatiner.leaderboardPanel.addChild(GameObjects.lbMask);
    leaderboardObj.updatevalues();
    
    SceneConatiner.leaderboardPanel.addChild(GameObjects.backMainScene);
    // console.log(lbPanelObjects[0].zIndex,GameObjects.AllTimebutton.zIndex);
    
    SceneConatiner.gameoverScene.addChild(GameObjects.restart);
    SceneConatiner.gameoverScene.addChild(GameObjects.restartMsg);
    SceneConatiner.gameoverScene.addChild(GameObjects.finalScore);
    SceneConatiner.gameoverScene.addChild(GameObjects.finalLightYear);
    SceneConatiner.gameoverScene.addChild(GameObjects.finallevel);

    SceneConatiner.gameScene.addChild(GameObjects.bgBack);
    SceneConatiner.gameScene.addChild(GameObjects.bgMiddle);
    SceneConatiner.gameScene.addChild(GameObjects.bgFront);  

    SceneConatiner.container = new PIXI.Container();
    SceneConatiner.gameScene.addChild(SceneConatiner.container);
    GameObjects.Contemitter = emitter.EmitterParticle(GameObjects.rocket, changingValues.customiser);
    SceneConatiner.container.addChild(GameObjects.Contemitter);
    SceneConatiner.gameScene.addChild(GameObjects.rocket);
    SceneConatiner.gameScene.addChild(GameObjects.scorePanel);
    SceneConatiner.gameScene.addChild(GameObjects.heart);
    SceneConatiner.gameScene.addChild(GameObjects.heartDrop);
    SceneConatiner.gameScene.addChild(GameObjects.multiBulletsIcon);
    SceneConatiner.gameScene.addChild(GameObjects.levelupText);
    SceneConatiner.gameScene.addChild(GameObjects.lightYearsText);
    SceneConatiner.gameScene.addChild(GameObjects.explosion);
    SceneConatiner.gameScene.addChild(GameObjects.scoreboard);
    SceneConatiner.gameScene.addChild(GameObjects.scoreText);
    SceneConatiner.gameScene.addChild(GameObjects.healthbar);

    GameObjects.healthbar.addChild(GameObjects.innerbar);
    GameObjects.healthbar.addChild(GameObjects.outerbar);

    GameObjects.rocket.health = 100;
    GameObjects.multiBullets.visible = false;

    GameObjects.playButton.on("pointerdown", gameSceneopner);
    GameObjects.howToplayButton.on("pointerdown",OpenPanel);
    GameObjects.musicButton.on("pointerdown",audioObj.musicONOFF);
    GameObjects.soundButton.on("pointerdown",audioObj.soundONOFF);
    GameObjects.musicClosedButton.on("pointerdown",audioObj.musicONOFF);
    GameObjects.soundClosedButton.on("pointerdown",audioObj.soundONOFF);
    GameObjects.backButton.on("pointerdown",OpenPanel);
    GameObjects.restart.on("pointerdown", restartGame);
    GameObjects.leaderboard.on("pointerdown",LeaderOpner);
    GameObjects.AllTimebutton.on("pointerdown",leaderboardObj.updatevaluesAllTime);
    GameObjects.Todaybutton.on("pointerdown",leaderboardObj.updatevalues);
    GameObjects.backMainScene.on("pointerdown",openMainScene);
}
function LeaderOpner()
{
    SceneConatiner.mainmenuScene.visible = false;
    SceneConatiner.leaderboardScene.visible = true;
}
function onGameReady() {

    for (let i = 0; i < ObjectSizes.bulletsSize; i++) {
        ObjectArray.bulletsObject[i] = bulletsObj.InstantiateBullets(Gametexture.bullet,GameObjects.rocket.x,GameObjects.rocket.y,0.07 * changingValues.customiser,0.5);
        SceneConatiner.gameScene  .addChild(ObjectArray.bulletsObject[i]);
    }

    for (let i = 0; i < ObjectSizes.bulletsSize; i++) {
        ObjectArray.bossbullets[i] = bulletsObj.InstantiateBullets(Gametexture.bullet, GameObjects.rocket.x, GameObjects.rocket.y, 10 * changingValues.customiser, 0.5);
        SceneConatiner.gameScene.addChild(ObjectArray.bossbullets[i]);
    }
    for (let i = 0; i < MAXVALUES.MAXNORMALSPACEOBJSIZE; i++) {
        var randomX = Math.floor((Math.random() * (screenPos.screenX - 30)) + 30);
        var randomY = Math.floor((Math.random() * 10) + (-10));
        ObjectArray.normalSpaceObject[i] = enemiesObj.InstantiateSpaceObjects(Gametexture.spacecraft, randomX, randomY, 0.09 * changingValues.customiser, 0.5,SpaceObjectsTypes.Normal);
        SceneConatiner.gameScene.addChild(ObjectArray.normalSpaceObject[i]);
    }

    States.bosscurrentState = STATEMACHINE.BOSSSTATEMACHINE.Spawn;
    
    for (let i = 0; i < MAXVALUES.MAXBOSSSPACEOBJSIZE; i++) {
        var randomX = Math.floor((Math.random() * (screenPos.screenX - 30)) + 30);
        var randomY = Math.floor((Math.random() * 10) + (-10));
       
        ObjectArray.bossSpaceObjects[i] = enemiesObj.InstantiateSpaceObjects(Gametexture.spaceship, randomX, randomY, 0.15 * changingValues.customiser, 0.5,SpaceObjectsTypes.Boss);
        SceneConatiner.gameScene.addChild(ObjectArray.bossSpaceObjects[i]);
    }

    for (let i = 0; i < MAXVALUES.MAXWALLERSPACEOBJSIZE; i++) {
        var randomX = Math.floor((Math.random() * (screenPos.screenX - 30)) + 30);
        var randomY = Math.floor((Math.random() * 10) + (-10));
        ObjectArray.wallerSpaceObjects[i] = enemiesObj.InstantiateSpaceObjects(Gametexture.waller, randomX, randomY, 0.15 * changingValues.customiser, 0.5,SpaceObjectsTypes.Waller);
        ObjectArray.wallerSpaceObjects[i].visible = false;
        SceneConatiner.gameScene.addChild(ObjectArray.wallerSpaceObjects[i]);
    }


}
function openMainScene()
{
    SceneConatiner.leaderboardScene.visible = false;
    SceneConatiner.mainmenuScene.visible = true;
}
function gameSceneopner() {
    States.currentState = STATEMACHINE.GAMESTATEMACHINE.PlayButtonPressed;
    if(controllingValues.isSoundClosed == false)
    {
        createjs.Sound.play("click",MusicProps.sfx);
    }
    SceneConatiner.gameScene  .visible = true;
    SceneConatiner.mainmenuScene  .visible = false;
    States.currentState = STATEMACHINE.GAMESTATEMACHINE.GamePlay;
    // setTimeout(() => {
    //     currentState = STATEMACHINE.GAMESTATEMACHINE.GamePlay;
    // },10 * MAXVALUES.ONESECOND)
}

GameObjects.rocket.interactive = true;
GameObjects.rocket
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

function onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd() {
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if (this.dragging) 
    {
        const newPosition = this.data.getLocalPosition(this.parent);
        if (newPosition.x < 10) {
            newPosition.x = 10;
        }
        else if (newPosition.x > screenPos.screenX - 10) {
            newPosition.x = screenPos.screenX - 10;
        }
        this.x = newPosition.x;
        // this.y = newPosition.y;
        emitter.moveEmitter(GameObjects.rocket.x + (13 * changingValues.customiser), GameObjects.rocket.y + (30 * changingValues.customiser));
    }
}

app.ticker.add(gameLoop);

function gameLoop() {
    update();
    if (States.currentState == STATEMACHINE.GAMESTATEMACHINE.GamePlay) 
    {
        if (controllingValues.isMultiBulletsPicked == false) {
            bulletsObj.moveBullets(3);
        }
        else {
            bulletsObj.moveMultiBullets(GameObjects.rocket.x - 20, GameObjects.rocket.x + 20,3);
        }

        if (controllingValues.iswallformed == true) {
            enemiesObj.moveSpaceObj(0);
            enemiesObj.moveBoss(0.4,2,2);
            enemiesObj.WallerObjMotion(0);
        }
        else 
        {
            setInterval(()=>
            {
                
                enemiesObj.SpawnNormalSpaceObj();

            },2 * MAXVALUES.ONESECOND)

            enemiesObj.moveSpaceObj(1);
            enemiesObj.moveBoss(0.2,2,2);
            enemiesObj.WallerObjMotion(0.5);
        }

        sceneObj.collisionCheck(ObjectArray.normalSpaceObject, ObjectSizes.normalSpaceObjectSize, SpaceObjectsTypes.Normal);
        sceneObj.collisionCheck(ObjectArray.bossSpaceObjects, ObjectSizes.bossSpaceObjectsSize, SpaceObjectsTypes.Boss);
        sceneObj.collisionCheck(ObjectArray.wallerSpaceObjects,ObjectSizes.wallerSpaceObjectSize, SpaceObjectsTypes.Waller);
        
        if (controllingValues.iswallformed == false) 
        {
            changingValues.lightYears += 1;
            GameObjects.lightYearsText.text = changingValues.lightYears;
        }

        if (helperclass.collisiondetection(GameObjects.rocket, GameObjects.multiBullets) && GameObjects.multiBullets.visible == true) {
            if(controllingValues.isSoundClosed == false)
            {
                Musics.powerupSound = createjs.Sound.play("PowerUP",MusicProps.sfx2);
                Musics.powerupSound.on("complete",audioObj.onComplete,this);
            }
            controllingValues.isMultiBullets = true;
            GameObjects.multiBullets.visible = false;
            controllingValues.isMultiBulletsPicked = true;
            GameObjects.multiBulletsIcon.alpha = 1;
        }
        for(let i = 0; i < ObjectSizes.bulletsSize;i++)
        {
            if (helperclass.collisiondetection(GameObjects.rocket,ObjectArray.bossbullets[i]))  {
            if(controllingValues.isSoundClosed == false)
            {
                createjs.Sound.play("Fall",MusicProps.sfx);
            }
            GameObjects.rocket.health -= 1;
            }
        }
         

        if (helperclass.collisiondetection(GameObjects.rocket, GameObjects.heartDrop) && GameObjects.heartDrop.visible == true) {
             if(controllingValues.isSoundClosed == false)
            {
                Musics.powerupSound = createjs.Sound.play("PowerUP",MusicProps.sfx2);
                Musics.powerupSound.on("complete",audioObj.onComplete,this);
            }

            controllingValues.isHeart = true;
            GameObjects.heartDrop.visible = false;
            controllingValues.isHeartPicked = true;
            GameObjects.heart.alpha = 1;
            GameObjects.rocket.health = 100;
            GameObjects.healthbar .outer.width = 100;
        }

        for (let i = 0; i < ObjectSizes.bulletsSize; i++) {

            if (helperclass.collisiondetection(GameObjects.rocket, ObjectArray.bossbullets[i]) && ObjectArray.bossbullets[i].visible == true) {
                GameObjects.rocket.health -= 0.2;
            }
        }

        for (let i = 0; i < ObjectSizes.wallerSpaceObjectSize; i++) {
            if (ObjectArray.wallerSpaceObjects[i].y >= (screenPos.screenY / 2 - 50) && ObjectArray.wallerSpaceObjects[i].visible == true && ObjectArray.wallerSpaceObjects[i].movable == false) {
                controllingValues.iswallformed = true;
                changingValues.wallcounter = changingValues.wallcounter + 1;
                ObjectArray.wallerSpaceObjects[i].movable = true;
            }
        }
        if (controllingValues.iswallformed == true) {
               
               setTimeout(() =>
               {
                   controllingValues.iswallformed = false;
                   
               },2.5 * MAXVALUES.ONESECOND);
            }

        helperclass.PowerUpsCheck(controllingValues.isMultiBulletsPicked, controllingValues.isMultiBullets, GameObjects.multiBulletsIcon);

        helperclass.PowerUpsCheck(controllingValues.isHeartPicked, controllingValues.isHeart, GameObjects.heart);

        if (GameObjects.rocket.health <= 0) {
            States.currentState = STATEMACHINE.GAMESTATEMACHINE.GameOver;
            GameObjects.finalScore.text = "Total Score: " + changingValues.score;
            GameObjects.finalLightYear.text = "Light Years Travelled: " + changingValues.lightYears;
            SceneConatiner.gameScene.visible = false;
            SceneConatiner.gameoverScene.visible = true;
        }
 
        GameTimers.PowerUPTimer = setInterval(()=>{
           
            if(GameObjects.heartDrop.visible == false && GameObjects.multiBullets.visible == false)
            { changingValues.PowerUpNumber = Math.floor(Math.random() * 2 ) + 1;
            if(changingValues.PowerUpNumber == 1 && controllingValues.isMultiBullets == false)
            {
                 helperclass.SpawnPowerUps(GameObjects.multiBullets, controllingValues.isMultiBullets, screenPos.screenY, screenPos.screenX);
            }
            if(changingValues.PowerUpNumber == 2 && controllingValues.isHeart == false )
            {
                 helperclass.SpawnPowerUps(GameObjects.heartDrop, controllingValues.isHeart, screenPos.screenY, screenPos.screenX);
            }
            }
           
        },4 * MAXVALUES.ONESECOND)

        if(GameObjects.multiBullets.visible == true)
        {
            helperclass.movePowerUp(GameObjects.multiBullets, 1);
        }

        if(GameObjects.heartDrop.visible == true)
        {
            helperclass.movePowerUp(GameObjects.heartDrop, 1);
        } 
        GameTimers.LevelUPTextTimer = setTimeout(levelUPTimer, 10 * MAXVALUES.ONESECOND);
    }
    if(isResized == true)
    {
        changeViewport();
        sceneObj.ObjectResponsiveness();
        SceneConatiner.container.removeChild(GameObjects.Contemitter);
        GameObjects.Contemitter = emitter.EmitterParticle(GameObjects.rocket, changingValues.customiser);
        SceneConatiner.container.addChild(GameObjects.Contemitter);
        canvasObj.changeTOStart();
    }
}
function rendererSettings()
{
    w = canvas.width;
    h = canvas.height;
    app.renderer.backgroundColor = 0x9999ff;
    app.renderer.resize(w,h);
    app.renderer.autoDenstiy = true;
    app.renderer.view.width = w;
    app.renderer.view.height = h;
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    screenPos.screenX = app.renderer.view.width;
    screenPos.screenY = app.renderer.view.height;
    changingValues.customiser = screenPos.screenX / 30 * screenPos.screenY / 30 * (app.renderer.resolution * (1 / (screenPos.screenX + screenPos.screenY)));
}

function levelUPTimer()
{
if(controllingValues.isLevelUPDone == true)
            {
                controllingValues.isLevelUPDone = false;
                setTimeout(levelUP,10 * MAXVALUES.ONESECOND);
                
            }
}

function levelUP()
{
    if(controllingValues.isLevelUPDone == false && States.currentState == STATEMACHINE.GAMESTATEMACHINE.GamePlay)
    {

        if(ObjectSizes.normalSpaceObjectSize < (MAXVALUES.MAXNORMALSPACEOBJSIZE - 5))
        {
            ObjectSizes.normalSpaceObjectSize = ObjectSizes.normalSpaceObjectSize + 5;
        }
        if(ObjectSizes.bossSpaceObjectsSize < (MAXVALUES.MAXBOSSSPACEOBJSIZE - 1))
        {
            ObjectSizes.bossSpaceObjectsSize = ObjectSizes.bossSpaceObjectsSize +  1;
        }
        if(ObjectSizes.wallerSpaceObjectSize < (MAXVALUES.MAXWALLERSPACEOBJSIZE - 4))
        {
            ObjectSizes.wallerSpaceObjectSize = ObjectSizes.wallerSpaceObjectSize + 4;
        }
          
        GameObjects.levelupText.visible = true;
        changingValues.level = changingValues.level + 1;
        GameObjects.finallevel.text = changingValues.level;
        setTimeout(TextVisibiler,MAXVALUES.ONESECOND * 0.5);
        controllingValues.isLevelUPDone = true;
    }

}
function TextVisibiler()
{
    GameObjects.levelupText.visible = false;
}

function update() {
    if (controllingValues.iswallformed == false) {
        GameObjects.bgFront.tilePosition.y += changingValues.speed;
        GameObjects.bgMiddle.tilePosition.y += changingValues.speed / 2;
        GameObjects.bgBack.tilePosition.y += changingValues.speed / 4;
    }
}

function restartGame() {
    if(controllingValues.isSoundClosed == false)
    {
        createjs.Sound.play("click",MusicProps.sfx);
    }
    resetGameObject();
    SceneConatiner.gameScene.visible = true;
    SceneConatiner.gameoverScene.visible = false;
    GameObjects.finalLightYear.text = 0;
    GameObjects.finalScore.text = 0;
    GameObjects.finallevel.text = 1;
    States.currentState = STATEMACHINE.GAMESTATEMACHINE.GamePlay;  
}

function resetGameObject() {
States.currentState = STATEMACHINE.GAMESTATEMACHINE.Replay;
States.bosscurrentState = STATEMACHINE.BOSSSTATEMACHINE.Reset;

    VisiblityOFF(ObjectSizes.bulletsSize,ObjectArray.bulletsObject);

    VisiblityOFF(ObjectSizes.normalSpaceObjectSize,ObjectArray.normalSpaceObject);

    VisiblityOFF(ObjectSizes.bossSpaceObjectsSize, ObjectArray.bossSpaceObjects);

    VisiblityOFF(ObjectSizes.wallerSpaceObjectSize, ObjectArray.wallerSpaceObjects);

    VisiblityOFF(ObjectSizes.bulletsSize,ObjectArray.bossbullets);
    
    clearInterval(GameTimers.PowerUPTimer);
    clearInterval(GameTimers.BossShootTimer);
    clearInterval(GameTimers.BossResetShootTimer);
    clearInterval(GameTimers.LevelUPTextTimer);
    controllingValues.isLevelUPDone = true;

    // ObjectArray.normalSpaceObject = [];
    // ObjectArray.bossSpaceObjects = [];
    // ObjectArray.wallerSpaceObjects = [];
    // ObjectArray.bulletsObject = [];
    // ObjectArray.bossbullets = [];

    changingValues.score = 0;
    changingValues.level = 1;
    changingValues.lightYears = 0;
    GameObjects.scoreText.text = 0;
    GameObjects.lightYearsText.text = 0;
    GameObjects.rocket.position.set(screenPos.screenX / 2, screenPos.screenY - (500 * changingValues.customiser));
    emitter.moveEmitter(GameObjects.rocket.x + (13 * changingValues.customiser), GameObjects.rocket.y + (30 * changingValues.customiser));
    GameObjects.rocket.health = 100;
    GameObjects.healthbar .outer.width = 100;
    controllingValues.isMultiBullets = false;
    controllingValues.isMultiBulletsPicked = false;
    GameObjects.explosion.visible = false;
    GameObjects.heartDrop.visible = false;
    GameObjects.multiBullets.visible = false;
    changingValues.wallcounter = 0;
    controllingValues.iswallformed = false;
    ObjectSizes.normalSpaceObjectSize = 5;
    ObjectSizes.bossSpaceObjectsSize = 1;
    ObjectSizes.wallerSpaceObjectSize = 4;
    controllingValues.isPanelOpned = false;
    // onGameReady();
}

function VisiblityOFF(size, object) {
    for (let i = 0; i < size; i++) {
        object[i].visible = false;
    }
}

function OpenPanel()
{
    if(controllingValues.isSoundClosed == false)
    {
        Sounds.ButtonClick =  createjs.Sound.play("click",MusicProps.sfx);
    }
    if(controllingValues.isPanelOpned == false)
    {
        controllingValues.isPanelOpned = true;
    }
    else
    {
        controllingValues.isPanelOpned = false;
    }
    GameObjects.howToplayPanel.visible = controllingValues.isPanelOpned;
    GameObjects.instruction.visible = controllingValues.isPanelOpned;
    GameObjects.backButton.visible = controllingValues.isPanelOpned;
}
