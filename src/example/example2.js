let example = {
    G: 6.67408e-11 ,
    dt:0.001,
    sizeArea: 30000000,
    divisions: 10,
    camera: {
        x:50000,
        y:50000,
        z: 1500000
    },
    objects:[{
        "name" : "Element1",
        "weight": 5.9726e25,
        "radius": 6371,
        "color": "rgb(255, 0, 0)",
        "needResize": 1,
        "x": 28669.5,
        "y": 60371,
        "z": 12742,
        "vx": 20000,
        "vy": 50000,
        "vz": 30000
    },{
        "name": "Element2",
        "weight": 5.9726e24,
        "radius": 6371,
        "color": "rgb(255, 255, 0)",
        "needResize": 1,
        "x": -28669.5,
        "y": -60371,
        "z": -12742,
        "vx": 10000,
        "vy": 0,
        "vz": 50000
    },{
        "name": "Element3",
        "weight": 5.9726e24,
        "radius": 6371,
        "color": "rgb(255, 0, 255)",
        "needResize": 1,
        "x": 28669.5,
        "y": 208371,
        "z": -22742,
        "vx": 100000,
        "vy": -5000,
        "vz": 3000
    },{
        "name": "Element4",
        "weight": 5.9726e24,
        "radius": 6371,
        "color": "rgb(0, 255, 255)",
        "needResize": 1,
        "x": -28669.5,
        "y": 108371,
        "z": 52742,
        "vx": 100000,
        "vy": 35000,
        "vz": 3000
    }]
};

export default example;