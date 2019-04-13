import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControlsLib from 'three-orbit-controls'
import throttle from 'lodash/throttle'
import spaceSystem from './spaceSystem'
import './Game.css'
import Gui from './Gui.js'
import example from '../example/example2'

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
                //console.log(this.state.params);
                //console.log(impact);
                let state = this.state.params;
                state.objects = impact;
                this.setState({
                    params: state
                });
                //console.log(this.state.params);
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