import * as PIXI from 'pixi.js'
import { helper } from "./helper.js";
import { changingValues, Gametexture, SceneConatiner, screenPos } from "./resource.js";
import { GameObjects, GameTextStyles, lbPanelObjects} from "./scene.js";
var helperclass = new helper();
export var istoday = true;
export var isallTime = false;
var Today = {
    Rank : [1,2,3,4,5,6,7,8,9,10],
    Name : ["sss","sss","sss","sss","sss","sss","sss","sss","sss","sss"],
    Score : [101,102,103,104,105,106,107,108,109,110],
}
var AllTime = {
    Rank : [11,12,13,14,15,16,17,18,19,20],
    Name : ["sss","sss","sss","sss","sss","sss","sss","sss","sss","sss"],
    Score : [201,202,203,204,205,206,207,208,209,210],
}
export var slider;
export var handle;


export class leaderboardEntry
{
    displayLBE(lbposx,lbposy,lbscale,playerscale,rank,name,score)
    {
        var obj = helperclass.DisplayTexture(Gametexture.lbPanel,lbposx,lbposy,lbscale,0.5);
        obj.rank = helperclass.DisplayText(rank,obj.x,obj.y,0.5,GameTextStyles.style);
        obj.img = helperclass.DisplayTexture(Gametexture.player,obj.rank.x + 30,obj.y,playerscale,0.5);
        obj.name = helperclass.DisplayText(name,obj.img.x + 30,obj.y,0.5,GameTextStyles.style);
        obj.score = helperclass.DisplayText(score,obj.name.x + 30,obj.y,0.5,GameTextStyles.style);
        return obj;
    }
    updatevalues()
    {

            istoday = true;
            GameObjects.Todaybutton.alpha = 1;
            GameObjects.TodaybuttonText.alpha = 1;
            for(let i = 0;i < 10;i++)
            {
                lbPanelObjects[i].rank.text = Today.Rank[i];
                lbPanelObjects[i].name.text = Today.Name[i];
                lbPanelObjects[i].score.text = Today.Score[i];
            }
            isallTime = false;
            GameObjects.AllTimebutton.alpha = 0.6;
            GameObjects.AllTimebuttonText.alpha = 0.6;

        

    }
    updatevaluesAllTime()
    {
            isallTime = true;
            GameObjects.AllTimebutton.alpha = 1;
            GameObjects.AllTimebuttonText.alpha = 1;
             for(let i = 0;i < 10;i++)
            {
                lbPanelObjects[i].rank.text = AllTime.Rank[i];
                lbPanelObjects[i].name.text = AllTime.Name[i];
                lbPanelObjects[i].score.text = AllTime.Score[i];
            }
            istoday = false;
            GameObjects.Todaybutton.alpha = 0.6;
            GameObjects.TodaybuttonText.alpha = 0.6;

    }

    sliderObj()
    {
        slider = new PIXI.Graphics();
        slider.beginFill(0xB8B8B8,0.8);
        slider.drawRect(0,0,10,160);
        slider.endFill();

        handle = new PIXI.Graphics();
        handle.beginFill(0xe0e0e0,1);
        handle.drawCircle(0,0,8);
        handle.endFill();

        slider.addChild(handle);
        handle.interactive = true;
        handle
        .on("pointerdown",this.dragStart)
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDragMove);
    }
    dragStart(event)
    {
        console.log("start");
         this.data = event.data;
        this.dragging = true;
    }
    onDragEnd() {
    this.dragging = false;
    this.data = null;
}

onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);

        if(newPosition.y > this.y)
        {
            SceneConatiner.leaderboardEntry.y -= 7;
        }
        else{
            SceneConatiner.leaderboardEntry.y += 7;
        }
        this.y = newPosition.y;
        if(this.y < 0)
        {
            this.y = 0;
            SceneConatiner.leaderboardEntry.y = 0;
        }
        else if(this.y > 120)
        {
            this.y = 120;
            SceneConatiner.leaderboardEntry.y = -700 * changingValues.customiser;
        }
        
    }
}

}
