let example = {
    G: 6.67408e-11 ,
    dt:0.01,
    sizeArea: 30000000,
    divisions: 10,
    camera: {
        x:50000,
        y:50000,
        z: 1500000
    },
    objects:[{
        "name" : "Element1",
        "weight": 5.9726e24,
        "radius": 6371,
        "color": "rgb(255, 0, 0)",
        "needResize": 1,
        "x": 200000,
        "y": 0,
        "z": 0,
        "vx": 20000,
        "vy": 100000,
        "vz": 70000
    },{
        "name": "Element2",
        "weight": 5.9726e24,
        "radius": 6371,
        "color": "rgb(255, 255, 0)",
        "needResize": 1,
        "x": 70000,
        "y": 0,
        "z": 0,
        "vx": 100000,
        "vy": 5000,
        "vz": 10000
    },{
        "name": "Element3",
        "weight": 5.9726e24,
        "radius": 6371,
        "color": "rgb(255, 0, 255)",
        "needResize": 1,
        "x": -6000,
        "y": 0,
        "z": 0,
        "vx": 50000,
        "vy": 40000,
        "vz": 30000
    }]
};

export default example;