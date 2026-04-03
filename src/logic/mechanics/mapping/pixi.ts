import {
    Application,
    Assets,
    Container, Point,
    Rectangle,
    Sprite,
    Texture
} from 'pixi.js';

export class PixiCanvas{
    app: Application
    canvas: HTMLCanvasElement
    coordinatesDiv: HTMLDivElement


    layers: Record<string, Container>
    textures: Record<string, Texture> = {}


    TILE_SIZE = 32;
    resolution = 2;

    vx = 0;
    vy = 0;


    constructor(canvas: HTMLCanvasElementm, coordinatesDiv: HTMLDivElement) {
        this.app = new Application();
        this.coordinatesDiv = coordinatesDiv;
        this.canvas = canvas

        this.app.init({
            canvas: canvas,
            autoStart: true,
            // backgroundAlpha: 0,
            backgroundColor: '#ff0000',
            roundPixels: true,
            clearBeforeRender: true,
            // autoDensity: true,
            resolution: window.devicePixelRatio * this.resolution,
            antialias: false,

            // resizeTo: document.getElementById('game-map')
        })

        this.layers = {
            subfloors: new Container(),
            wires: new Container(),
            pipes: new Container(),
            tiles: new Container(),
            decals: new Container(),
            structures: new Container(),
            entities: new Container(),
        }

        Object.keys(this.layers).forEach(layer => {
            this.layers[layer].scale.set(this.TILE_SIZE, this.TILE_SIZE);
        })
    }

    getLayers(): string[]
    {
        return Object.keys(this.layers)
    }

    setLayerVisibility(layer: string)
    {
        this.layers[layer].visible = !this.layers[layer].visible
    }
    async loadTexturesAll(array)
    {
        await Promise.all(
            Object.keys(array).map(async (spriteId: string) => {
                await this.loadTexture(spriteId, array[spriteId]);
            })
        );
    }

    async loadTexture(spriteId: string, spriteUrl: string = '', x: number = 0, y: number = 0, writeDown: boolean = true)
    {
        if(!this.textures[spriteId]) {
            let rectangleSideLength = 32
            if (x !== 0 || y !== 0){
                rectangleSideLength /= 2
            }
            const rect = new Rectangle(x, y, rectangleSideLength, rectangleSideLength);
            let image
            try {
                image = await Assets.load(spriteUrl)
                image.frame = rect;
            }
            catch (e) {
                image = await Assets.load('https://server.ss14.tools/storage/images/noSprite.png')
                // image = await Assets.load('https://ss14db.info/storage//repositoriesData/762771867/textures/Structures/Walls/cobblebrick_chromite.rsi/full.png')
            }
            const texture = new Texture(image);
            if (!writeDown) return texture
            this.textures[spriteId] = texture
        }
        return this.textures[spriteId]
    }


    rewriteTexture(spriteId: string, texture: Texture)
    {
        this.textures[spriteId] = texture
    }

    drawSprite(spriteIdentifier: string | Texture, layer: string, position_x: number, position_y: number, rot: number = 0, mirror: boolean = false){
        let sprite
        if(typeof spriteIdentifier === 'string') {
            const texture = this.textures[spriteIdentifier];
            if(!texture) return;
            sprite = new Sprite(texture);
        }
        else {
            sprite = new Sprite(spriteIdentifier);
            if(!sprite) return;
        }
        if (mirror) sprite.scale.y *= -1
        sprite.texture.source.scaleMode = 'nearest';
        sprite.width = 1;
        sprite.height = 1;
        sprite.rotation = rot;
        sprite.anchor.set(0.5);
        sprite.position.set(position_x, position_y);
        this.layers[layer].addChild(sprite);
    }

    createSprite(texture: Texture)
    {
        const sprite = new Sprite(texture);
        sprite.texture.source.scaleMode = 'nearest';
        return sprite
    }

    convertIntoTexture(target: Container | Sprite)
    {
        return this.app.renderer.textureGenerator.generateTexture({
            target: target,
            resolution: 2,
            antialias: false,
            textureSourceOptions: {
                scaleMode: 'nearest'
            },
        })
    }

    setMapInteractivity() {
        this.app.stage.interactive = true;

        let startPos
        let dragStart
        let lastPos
        let dragging = false;

        let oldMousePos = null;
        let mouseMoving = false;


        // movement
        this.app.stage.on('mousedown', (e) => {
            this.vy = 0
            this.vx = 0

            this.app.stage.cursor = 'grabbing'
            startPos = this.app.stage.position.clone()
            dragStart = e.data.global.clone()
            dragging = true

        })
        this.app.stage.on('mouseup', (e) => {
            dragging = false
            this.app.stage.cursor = 'default'
        })
        this.app.stage.on('mousemove', (e) => {
            const current = e.data.global;
            this.updateMouseCoordinates(e, current)
            if(!dragging) return
            if (oldMousePos !== null){
                const dx = current.x - oldMousePos.x;
                const dy = current.y - oldMousePos.y;

                const distance = Math.sqrt(dx * dx + dy * dy);
                mouseMoving = distance > 10;
            }
            oldMousePos = current

            const changeX = current.x - dragStart.x
            const changeY = current.y - dragStart.y
            this.app.stage.position.set(
                startPos.x + changeX,
                startPos.y + changeY
            )
            const factor = 0.1;
            this.vx = changeX * factor
            this.vy = changeY * factor
        })
        this.app.stage.on('mouseleave', (e) => {
            dragging = false
            this.app.stage.cursor = 'default'
        })


        // zooming
        this.app.stage.on('wheel', (e) => {
            const scaleChange = e.deltaY * -0.001

            const mousePos = e.data.global; // global mouse coords

            let newScale = this.app.stage.scale.x + scaleChange
            newScale = newScale < 0.2 ? 0.2 : newScale

            const scaleFactor = newScale / this.app.stage.scale.x

            this.app.stage.scale.x = newScale
            this.app.stage.scale.y = newScale

            this.app.stage.scale.set(newScale);

            const dx = mousePos.x - this.app.stage.position.x;
            const dy = mousePos.y - this.app.stage.position.y;

            const x = dx * (scaleFactor - 1)
            const y = dy * (scaleFactor - 1)

            this.app.stage.position.x -= x
            this.app.stage.position.y -= y

            // todo turn of pixalation when scale out
        })

        this.app.ticker.add(() => {
            if (this.vx === 0 && this.vy === 0) return
            if (!dragging){
                this.vx *= 0.95
                this.vy *= 0.95

                this.app.stage.x += this.vx
                this.app.stage.y += this.vy
            }
            else if (!mouseMoving) {
                const friction = 0.1;
                this.vx *= friction
                this.vy *= friction
            }
            // cool down, to prevent jumpings
            if(Math.abs(this.vx) < 0.1) this.vx = 0
            if(Math.abs(this.vy) < 0.1) this.vy = 0
        })

    }
    async renderMap()
    {
        Object.keys(this.layers).forEach(layer => {
            this.layers[layer].label = layer
            this.app.stage.addChild(this.layers[layer])
        })
        // this.app.stage.addChild(this.layers.subfloors)
        // this.app.stage.addChild(this.layers.wires)
        // this.app.stage.addChild(this.layers.structures)
    }

    updateMouseCoordinates(e, current: Point) {

        const global = this.app.stage.toLocal(e.global)
        const x = Math.floor((global.x / this.app.stage.scale.x) / 32);
        const y = Math.floor((global.y / this.app.stage.scale.x) / 32);

        this.coordinatesDiv.innerHTML = `x: ${x} y: ${y}`
    }
}