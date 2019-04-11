// based on https://ssd.jpl.nasa.gov/horizons.cgi?s_target=1#top 
let example = {
    G: 6.67408e-11 / 1000,
    dt:1,
    near: 100,
    far: 3000000000,
    divisions: 10,
    camera: {
        x:0,
        y:0,
        z: 300000000
    },
    objects :[{
        name: "Sun", 
        weight: 1988500e+24,
        radius: 695700,
        needResize: 10,
        texture: 'images/textures/sunmap.jpg',
        color: 'rgb(255, 0, 0)',
        x: -2.256354271511951e+5,
        y: 1.132679762573425e+6,
        z: -5.672921174540708e+3,
        vx: -1.435872953662852E+1,
        vy: 1.779506244485902E+0,
        vz: 3.737310085128446E-1
    },{
        name: "Mercury",
        weight: 3.302e+23,
        radius: 2440,
        needResize: 1000,
        texture: 'images/textures/mercurymap.jpg',
        color: 'rgb(255, 0, 0)',
        x: -3.486464851120884e+7,
        y: -5.850284147890126e+7,
        z: -1.701007796612002e+6,
        vx: 3.228266436261626E+4,
        vy: -2.213163560944330E+4,
        vz: -4.771073247910603E+3
    },{
        name: "Venus",
        weight: 48.685e+23,
        radius: 6051.84,
        needResize: 1000,
        texture: 'images/textures/venusmap.jpg',
        color: 'rgb(255, 0, 0)',
        x: 3.558127444818084e+7,
        y: -1.016343722230160e+8,
        z: -3.482094754754119e+6,
        vx: 3.282140342104274E+4,
        vy: 1.140662710741241E+4,
        vz: -1.738009831561365E+3
    },{
        name: "Earth",
        weight: 5.97219e+24,
        radius: 6371.01,
        needResize: 1000,
        texture: 'images/textures/earthmap.jpg',
        color: 'rgb(255, 0, 0)',
        x: -1.455733460945613e+8,
        y: -3.424162575340020e+7,
        z: -3.267683441041037e+3,
        vx: 6.544943881962406E+3,
        vy: -2.906606810798772E+4,
        vz: 2.081526418331592E+0
    },{
        name: "Mars",
        weight: 6.4171e+23,
        radius: 3389.92,
        needResize: 1000,
        texture: 'images/textures/marsmap.jpg',
        color: 'rgb(255, 0, 0)',
        x: -3.128784983630511e+6,
        y: 2.361318353647656e+8,
        z: 4.989613765306219e+6,
        vx: -2.332648762922359E+4,
        vy: 1.760987944467660E+3,
        vz: 6.092406675678612E+2
    }
    ]
}
export default example;