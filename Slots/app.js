const Application = PIXI.Application ;

const app = new PIXI.Application({ transparent: false });
document.body.appendChild(app.view);
app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.view.style.position = 'absolute' ;

app.renderer.backgroundColor = 0x23395D ;

const slot_machine = PIXI.Sprite.from('art/slot_machine/slot-machine.png');
const slot_machine_bg = PIXI.Sprite.from('art/slot_machine/slot-machine-bg.png');
const lever_up = PIXI.Sprite.from('art/slot_machine/lever_up.png');
const lever_down = PIXI.Sprite.from('art/slot_machine/lever_down.png');
const card_1  = PIXI.Sprite.from('art/items/item00.png');

var reel_1 = [], reel_2 = [], reel_3 = []

var loader = PIXI.Loader.shared;
loader.add('slots_config', "slots_config.json");
loader.load(func);

function func () {
    console.log(loader.resources.slots_config.data.items[0])
}


lever_down.visible = false

slot_machine.addChild(lever_up)
slot_machine.addChild(lever_down)
slot_machine.addChild(slot_machine_bg)

slot_machine.anchor.x = .5
lever_up.anchor.x = .5
lever_down.anchor.x = .5
slot_machine_bg.anchor.x = .5

lever_up.interactive = true
lever_up.on('mousedown', runSlots);

slot_machine.x = app.screen.width / 2

function runSlots() {
    lever_down.visible = true
    lever_up.visible = false
    window.setTimeout(
        function() {
            lever_up.visible = true
            lever_down.visible = false
        }, 1000 /* but after 2000 ms */
    )

    slotsAnimation()
}

function slotsAnimation() {
    slot_machine_bg.visible = false
    window.setTimeout(
        function() {
            slot_machine_bg.visible = true
        }, 4000
    )
}


app.stage.addChild(slot_machine)