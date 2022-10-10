import { controllingValues} from "./resource.js";
import { GameObjects } from "./scene.js";
var props;
var sfx;
var sfx2;
var shooting;
var bg;
var explosionSound;
var shootSound;
var ButtonClick;
var powerUPSound;
var fallSound;

export var Sounds = {
  explosionSound,
  shootSound,
  ButtonClick,
  powerUPSound,
  fallSound,
  bg,
};

export var MusicProps = {
  props,
  sfx,
  sfx2,
  shooting,
};
export var Musics = {
  Bg : [{id: "bg",src: "6KMCVP9.mp3"}],
  Explosion : [{id: "explosion",src: "2W5YER9.mp3"}],
  Shoot : [{id: "shoot",src:"PHV7T73.mp3"}],
  Fall : [{id:"Fall",src:"24NGXQL.mp3"}],
  powerupSound : [{id:"PowerUP",src:"W3B5FU7.mp3",startTime:0, duration:25}],
  Click : [{id:"click",src:"FMQLHRS.mp3"}],
};
export var audioPath = "sounds/dummy/";

export class audio{
    constructor()
    {}
    init() {
        MusicProps.props = new createjs.PlayPropsConfig().set({ loop: -1, volume: 0.15,delay : -1,interrupt:73,offset:0,pan:0 });
        MusicProps.sfx = new createjs.PlayPropsConfig().set({ loop: 0, volume: 0.3,delay : -1,interrupt:73,offset:0,pan:0 });
        MusicProps.sfx2 = new createjs.PlayPropsConfig().set({ loop: 0, volume: 0.2,delay : -1,interrupt:73,offset:0,pan:0});
        MusicProps.shooting = new createjs.PlayPropsConfig().set({ loop: -1, volume: 0.2,delay : -1,interrupt:73,offset:0,pan:0 });

    createjs.Sound.addEventListener("fileload",this.handleLoad, true);
    Sounds.bg =  createjs.Sound.registerSounds(Musics.Bg,audioPath);
    Sounds.explosionSound =  createjs.Sound.registerSounds(Musics.Explosion, audioPath);
    Sounds.shootSound = createjs.Sound.registerSounds(Musics.Shoot,audioPath);
    Sounds.ButtonClick = createjs.Sound.registerSounds(Musics.Click,audioPath);
    Sounds.powerUPSound = createjs.Sound.registerSounds(Musics.powerupSound,audioPath);
    Sounds.fallSound = createjs.Sound.registerSounds(Musics.Fall,audioPath);
    }

    handleLoad(event) {
        document.body.addEventListener("click", function () {
            if (controllingValues.isMusicClosed == false && controllingValues.isMusic == false) {
                createjs.Sound.play("bg",MusicProps.props);
                controllingValues.isMusic = true;
            }
            else
            {
                createjs.Sound.off("bg",MusicProps.props);
            }
        });
    }
    musicONOFF()
    {
        if(controllingValues.isSoundClosed == false)
        {
            createjs.Sound.play("click",MusicProps.sfx);
        }
        if(controllingValues.isMusicClosed == false)
        {
            Sounds.bg = createjs.Sound.stop();
            controllingValues.isMusicClosed = true;        
        }
        else
        {
            createjs.Sound.play("bg",MusicProps.props);
            controllingValues.isMusicClosed = false;
        }
        GameObjects.musicButton.visible = !controllingValues.isMusicClosed;
        GameObjects.musicClosedButton.visible = controllingValues.isMusicClosed;
    }

    soundONOFF()
    {
        if(controllingValues.isSoundClosed == false)
        {
            createjs.Sound.play("click",MusicProps.sfx);
        }
        if(controllingValues.isSoundClosed == false)
        {
            controllingValues.isSoundClosed = true;        
        }
        else
        {
            controllingValues.isSoundClosed = false;
        }
        GameObjects.soundButton.visible = !controllingValues.isSoundClosed;
        GameObjects.soundClosedButton.visible = controllingValues.isSoundClosed;
    }
    onComplete()
    {
        Musics.powerupSound = createjs.Sound.stop();
    }
}
