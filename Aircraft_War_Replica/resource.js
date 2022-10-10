export var Gametexture =
{
  background: "images/space.jpg",
  rocket: "images/rocket.png",
  spacecraft: "images/spacecraft.png",
  bullet: "images/bullets.png",
  button: "images/button.png",
  explosion: "images/expl.png",
  bgback: "images/background/back.png",
  bgmiddle: "images/background/middle.png",
  bgfront: "images/background/front.png",
  spaceship: "images/spaceship.png",
  scorePanel: "images/panel.png",
  heart: "images/heart.png",
  multiBullets: "images/multiBullets.png",
  waller: "images/waller.png",
  rotator: "images/rotator.png",
  music: "images/music.png",
  sound: "images/sound.png",
  musicClose: "images/musicRed.png",
  soundClose: "images/soundRed.png ",
  back: "images/arrow.png",
  leaderboard: "images/leaderboard.png",
  lbPanel: "images/lbpanels.png",
  player: "images/player.png",
};

var currentState;
var bossCurrentState;

export var States = {
  currentState,
  bossCurrentState,
};

var level = 1;
var lightYears = 0;
var counter = 0;
var wallcounter = 0;
var customiser = 0;
var i = 0;
var score = 0;
var speed = 0.5;
var PowerUpNumber = 0;

export var changingValues = {
  level,
  lightYears,
  counter,
  wallcounter,
  customiser,
  i,
  score,
  speed,
  PowerUpNumber,
};

var isMultiBulletsPicked = false;
var isMultiBullets = false;
var isHeartPicked = false;
var isHeart = false;
var isUpdate = false;
var iswallformed = false;
var isPanelOpned = false;
var isShooting = false;
var isLevelUPDone = false;
var isMusic = false;
var isMusicClosed = false;
var isSoundClosed = false;

export var controllingValues = {
  isMultiBulletsPicked,
  isMultiBullets,
  isHeartPicked,
  isHeart,
  isUpdate,
  iswallformed,
  isPanelOpned,
  isShooting,
  isLevelUPDone,
  isMusic,
  isMusicClosed,
  isSoundClosed,
};

export var screenPos = {
  screenX,
  screenY,
};

var mainmenuScene;
var gameScene;
var gameoverScene;
var container;
var leaderboardScene;
var leaderboardPanel;
var leaderboardEntry;

export var SceneConatiner = {
mainmenuScene,
gameScene,
gameoverScene,
container,
leaderboardScene,
leaderboardPanel,
leaderboardEntry,
};

var LevelUPInterval;
var PowerUPTimer;
var PowerUpNumber;
var BossShootTimer;
var BossResetShootTimer;
var LevelUPTextTimer;

export var GameTimers = {
  LevelUPInterval,
  PowerUPTimer,
  BossShootTimer,
  BossResetShootTimer,
  LevelUPTextTimer
};

const MAXNORMALSPACEOBJSIZE = 100;
const MAXBOSSSPACEOBJSIZE = 10;
const MAXWALLERSPACEOBJSIZE = 20;
const ONESECOND = 1000;

export const MAXVALUES = {
  MAXNORMALSPACEOBJSIZE,
  MAXBOSSSPACEOBJSIZE,
  MAXWALLERSPACEOBJSIZE,
  ONESECOND,
};

const GAMESTATEMACHINE = {
  MainMenu : 1,
  PlayButtonPressed : 2,
  GamePlay : 3,
  GameOver: 4,
  Replay: 5
};

const BOSSSTATEMACHINE = {
  Spawn : 1,
  Move : 2,
  Shoot : 3,
  ResetShooting : 4,
  Reset : 5,
};

export const STATEMACHINE = {
  GAMESTATEMACHINE,
  BOSSSTATEMACHINE,
};