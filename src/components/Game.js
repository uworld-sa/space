import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControlsLib from 'three-orbit-controls'
import throttle from 'lodash/throttle'
import spaceSystem from './spaceSystem'
import './Game.css'
import Gui from './Gui.js'
import example from '../example/example'
import example2 from '../example/example2'

const OrbitControls = OrbitControlsLib(THREE);

export default class Game extends Component { 
    constructor(props) {
        super(props);
        let params = Object.assign({}, example);
        params.showGrid = true;
        params.play = true;
        this.state = {
            params: Object.assign({}, params)
        }
        this.onGuiChange = this.onGuiChange.bind(this);
       
        this.resizeWindow = throttle(this.resizeWindow, 300);
        this.space = {}
    }

    componentDidMount() {
        let width = this.container.clientWidth,
            height = this.container.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, this.state.params.near, this.state.params.far);
        this.camera.position.x = this.state.params.camera.x;
        this.camera.position.y = this.state.params.camera.y;
        this.camera.position.z = this.state.params.camera.z;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(width, height);
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.enableZoom = true;
        this.orbit.enableKeys = false;

        this.space = new spaceSystem(this.scene, this.camera, this.renderer, this.state.params);
        this.space.initMiniStars();
        this.space.initObjects();

        this.container.appendChild(this.renderer.domElement);
        this.start();
        window.addEventListener("resize", this.resizeWindow);

    }

    changeExample(e,data) {
        e.preventDefault();
        let params = this.state.params;
        params.play = false;
        this.setState({
            params
        });
        while(this.scene.children.length > 0){
            this.scene.remove(this.scene.children[0]);
        }

        params = Object.assign({}, data);
        console.log(params);
        params.play = true;

        this.space = undefined;
        this.space = new spaceSystem(this.scene, this.camera, this.renderer, params);
        //console.log(this.space);
        this.space.initMiniStars();
        this.space.initObjects();
        this.camera.position.x = params.camera.x;
        this.camera.position.y = params.camera.y;
        this.camera.position.z = params.camera.z;
        this.camera.far = params.far;
        this.camera.near = params.near;
        this.setState({
            params
        });
        console.log(data);
        console.log(params);
        //this.space.updateSpace(data);
        //this.updateArea(params);
        //this.start();
    }

    onGuiChange = data => {
        /*if (this.state.play !== data.play) {
            console.log(this.frameId);
            if (data.play) {
                this.start();
                console.log('start');
            } else {
                this.stop();
                console.log('stop');
            }
        }*/
        this.setState({
            params:data
        });
        this.renderScene();
        this.space.updateSpace(data);
        this.updateArea(data);
    }

    updateArea(data) {
        if (this.camera.far !== data.far) {
            this.camera.far = data.far;
            this.camera.updateProjectionMatrix();
        }
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
        this.frameId = false;
    };

    animate = () => {
        //console.log(this.state.play);
        if (this.state.params.play) {
            let impact = this.space.checkImpact();
            if (impact) {
                let state = this.state.params;
                state.objects = impact;
                this.setState({
                    params: state
                });
                this.space.updateSpace(state);
            }
            this.space.calculateMotions();
        }
        this.renderScene();
        this.frameId = requestAnimationFrame(this.animate);
    };

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    };

    resizeWindow = () => {
        let width = this.container.clientWidth,
            height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    componentWillUnmount() {
        this.stop();
        this.container.removeChild(this.renderer.domElement);
        window.removeEventListener("resize", this.resizeWindow);
    }

    render() {
        const {
            params
        } = this.state;
        return (
            <div className = 'threejs-app' >
                {/*<div className="example">
                    <a href="/" onClick={(e) => this.changeExample(e,example)}>Mini solar</a>
                    <a href="/" onClick={(e) => this.changeExample(e,example2)}>Random</a>
                </div>*/}
                <div className = 'scene'
                    ref = {
                        container => this.container = container
                    }
                />
                <Gui params = { params }
                    onGuiChange = {
                        this.onGuiChange
                    }
                >
                </Gui>
            </div>
        )
    }
}