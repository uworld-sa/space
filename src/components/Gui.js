import React, {
    Component
} from 'react'
import * as THREE from 'three'
import * as dg from 'dis-gui';

export default class Gui extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleUpdateObject = this.handleUpdateObject.bind(this);
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    handleUpdate(value,key) {
        let params = Object.assign({}, this.props.params);
        params[key] = value;
        this.props.onGuiChange(params);
    }
    handleUpdateObject(value,key,ind) {
        let params = Object.assign({}, this.props.params);
        if (key === 'color') {
            params.objects[ind][key] = `rgb(${value.red}, ${value.green}, ${value.blue})`;
        } else {
            params.objects[ind][key] = value;
        }
        this.props.onGuiChange(params);
    }

    render() {
        const params = this.props.params;
        let colors = {};
        for (let ind in params.objects) {
            let color = new THREE.Color( params.objects[ind].color ).getHexString();
            colors[ind] = this.hexToRgb('#'+color);
        }
        let buttonPlay;

        if (params.play) {
            buttonPlay = <dg.Button label='Stop animation' onClick={() => this.handleUpdate(!params.play,'play')}/>;
        } else {
            buttonPlay = <dg.Button label='Play animation' onClick={() => this.handleUpdate(!params.play,'play')}/>;
        }
        return (
            <dg.GUI expanded={false}>
                {buttonPlay}

                <dg.Number
                    label='dt' value={params.dt}
                    onChange={ (value) => this.handleUpdate(value,'dt')}
                />
                <dg.Number
                    label='Размер космоса'
                    value={params.far}
                    onChange={ (value) => this.handleUpdate(value,'far')}
                />
                <dg.Number
                    label='Размер сетки'
                    value={params.divisions}
                    min={5}
                    max={200}
                    step={1}
                    onFinishChange={ (value) => this.handleUpdate(value,'divisions')}
                />
                <dg.Checkbox
                    label='Показать сетку'
                    checked={params.showGrid}
                    onChange={ (value) => this.handleUpdate(value,'showGrid')}
                />
                {params.objects.map((object, i) => {
                    return (
                    <dg.Folder key={i} label={object.name} expanded={false}>
                        <dg.Number
                            label='Масса кг'
                            value={object.weight}
                            onChange={ (value) => this.handleUpdateObject(value,'weight',i)}
                        />
                        <dg.Number
                            label='Радиус км'
                            value={object.radius}
                            onChange={ (value) => this.handleUpdateObject(value,'radius',i)}
                        />
                        <dg.Number
                            label='Умножитель радиуса'
                            value={object.needResize}
                            step={1}
                            onChange={ (value) => this.handleUpdateObject(value,'needResize',i)}
                        />
                        {
                            object.texture === undefined ? (
                                <dg.Color
                                label = 'Color'
                                expanded = {
                                    false
                                }
                                red = {
                                    colors[i].r
                                }
                                green = {
                                    colors[i].g
                                }
                                blue = {
                                    colors[i].b
                                }
                                onFinishChange = {
                                    (value) => this.handleUpdateObject(value, 'color', i)
                                }
                                />
                            ) : ('')
                        }
                        {/*
                            !params.play ? (
                                <dg.Folder key={i} label={'Позиция и скорость'} expanded={false}>
                                    <dg.Number
                                        label='Позиция x'
                                        value={object.x}
                                        onChange={ (value) => this.handleUpdateObject(value,'x',i)}
                                    />
                                    <dg.Number
                                        label='Позиция y'
                                        value={object.y}
                                        onChange={ (value) => this.handleUpdateObject(value,'y',i)}
                                    />
                                    <dg.Number
                                        label='Позиция z'
                                        value={object.z}
                                        onChange={ (value) => this.handleUpdateObject(value,'z',i)}
                                    />
                                </dg.Folder>
                            ) : ('')*/

                        }
                    </dg.Folder>);
                }
                )}
            </dg.GUI>
        )
    }
}