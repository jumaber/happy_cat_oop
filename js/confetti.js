function startConfetti() {
        tsParticles.load({
            id: "tsparticles",
            options: {
    "fullScreen": {
        "zIndex": 1
    },
    "particles": {
        "color": {
        "value": [
            "#FFFFFF",
            "#FFd700"
        ]
        },
        "move": {
        "direction": "bottom",
        "enable": true,
        "outModes": {
            "default": "out"
        },
        "size": true,
        "speed": {
            "min": 1,
            "max": 3
        }
        },
        "number": {
        "value": 500,
        "density": {
            "enable": true,
            "area": 800
        }
        },
        "opacity": {
        "value": 1,
        "animation": {
            "enable": false,
            "startValue": "max",
            "destroy": "min",
            "speed": 0.3,
            "sync": true
        }
        },
        "rotate": {
        "value": {
            "min": 0,
            "max": 360
        },
        "direction": "random",
        "move": true,
        "animation": {
            "enable": true,
            "speed": 60
        }
        },
        "tilt": {
        "direction": "random",
        "enable": true,
        "move": true,
        "value": {
            "min": 0,
            "max": 360
        },
        "animation": {
            "enable": true,
            "speed": 60
        }
        },
        "shape": {
        "type": [
            "circle",
            "square",
            "triangle",
            "polygon",
            "emoji",
            "image"
        ],
        "options": {
            "polygon": [
            {
                "sides": 5
            },
            {
                "sides": 6
            }
            ],
            "emoji": {
            "particles": {
                "size": {
                "value": 8
                }
            },
            "value": [
                "💩",
                "🤡",
                "🍀",
                "🍙",
                "🦄",
                "⭐️"
            ]
            },
            "image": [
            {
                "src": "https://particles.js.org/images/fruits/apple.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/avocado.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/banana.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/berries.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/cherry.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/grapes.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/lemon.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/orange.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/peach.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/pear.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/pepper.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/plum.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/star.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/strawberry.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/watermelon.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            },
            {
                "src": "https://particles.js.org/images/fruits/watermelon_slice.png",
                "width": 32,
                "height": 32,
                "particles": {
                "size": {
                    "value": 16
                }
                }
            }
            ]
        }
        },
        "size": {
        "value": {
            "min": 2,
            "max": 4
        }
        },
        "roll": {
        "darken": {
            "enable": true,
            "value": 30
        },
        "enlighten": {
            "enable": true,
            "value": 30
        },
        "enable": true,
        "speed": {
            "min": 15,
            "max": 25
        }
        },
        "wobble": {
        "distance": 30,
        "enable": true,
        "move": true,
        "speed": {
            "min": -15,
            "max": 15
        }
        }
    }
    }
        });
}