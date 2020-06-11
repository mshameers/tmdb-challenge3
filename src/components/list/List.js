import {Lightning} from "wpe-lightning-sdk";
import Item from "../item";

export default class List extends Lightning.Component {
    static _template() {
        const timingFunction = 'cubic-bezier(0.20, 1.00, 0.80, 1.00)';
        return {
            Items: {
                y: 120, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Focus: {
                y: 115, x: 90, mountX: 0.5,
                rect: true, colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4,
                texture: lng.Tools.getRoundRect(240, 350, 20, 8, 0xff8ecea2, false, 0xffffffff)
            },
            Metadata: {
                Title: {
                    alpha: 0.0001,
                    text: {text: '', fontFace: 'SourceSansPro-Bold', color: 0xffffffff, fontSize: 50}
                },
                SubTitle: {
                    alpha: 0.0001, colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4,
                    text: {text: '', fontFace: 'SourceSansPro-Regular', fontSize: 40}
                },
                transitions: {
                    alpha: {duration: 1, timingFunction},
                    y: {duration: 1, timingFunction}
                }
            }
        }
    }

    _init() {
        let _titleAnimation = this.tag("Title").animation({
            duration: 1, stopMethod: "immediate", actions: [{p: 'y', v: {0: -50, 1: 0}}, {p: 'alpha', v: {0: 0, 1: 1}}]
        });
        let _subTitleAnimation = this.tag("SubTitle").animation({
            duration: 1, stopMethod: "immediate", actions: [{p: 'y', v: {0: 0, 1: 50}}, {p: 'alpha', v: {0: 0, 1: 1}}]
        });
        this._index = 0;
        this.tag("Title").on("txLoaded", ()=> {
            _titleAnimation.start();
        });
        this.tag("SubTitle").on("txLoaded", ()=> {
            _subTitleAnimation.start();
        });
    }

    _focus() {
        this.tag('Focus').setSmooth('alpha', 1);
    }

    _unfocus() {
        this.tag('Focus').setSmooth('alpha', 0);
    }

    _handleLeft() {
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight(){
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    setIndex(idx){
        // store new index
        this._index = idx;

        // update position
        this.tag("Items").setSmooth("x",  idx * -220 );
    }

    set label(v) {
        // @todo: update list title
    }

    set movies(v) {
        // we add an array of object with type: Item
        this.tag("Items").children = v.map((movie, index)=>{
            return {
                type: Item,
                item: movie,
                x: index * (Item.width + Item.offset)
            };
        });
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }

    $updateMetadata(item) {
        this.tag("Title").patch({text: {text: item.title}});
        this.tag("SubTitle").patch({text: {text: item.genres}});
    }
}
