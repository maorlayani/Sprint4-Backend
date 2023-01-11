const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(filterBy) {
    const criteria = {}
    if (filterBy) {
        const { title } = filterBy
        if (title) {
            const regex = new RegExp(title, 'i')
            criteria.name = { $regex: regex }
        }
    }
    try {
        const collection = await dbService.getCollection('board')
        var boards = await collection.find({}).toArray()
        if (!boards || !boards.length) boards = await collection.insertMany(gDefaultBoards)
        boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        ('ERROR: cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        board.labels = labelsData
        const addedBoard = await collection.insertOne(board)
        console.log('addedBoard', addedBoard)
        return addedBoard.ops[0]
    } catch (err) {
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = { ...board, _id: ObjectId(board._id) }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: boardToSave._id }, { $set: boardToSave })
        return boardToSave
    } catch (err) {
        throw err
    }
}

function _makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

const labelsData = [
    {
        "id": "l101",
        "title": "",
        "color": "#7BC86C" // Green
    },
    {
        "id": "l102",
        "title": "",
        "color": "#F5DD29" //Yellow
    },
    {
        "id": "l103",
        "title": "",
        "color": "#FFAF3F" // Orange
    },
    {
        "id": "l104",
        "title": "",
        "color": "#EF7564"//Red
    },
    {
        "id": "l105",
        "title": "",
        "color": "#CD8DE5"//Purple
    },
    {
        "id": "l106",
        "title": "",
        "color": "#5BA4CF" //Blue
    }
]

const gDefaultBoards = [
    {
        "title": "Company Overview",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197071/pawel-czerwinski-lKEvGdP0Oig-unsplash_xhxxbf.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673357473/john-price-FE7ATjzRRMs-unsplash-min_fbj9bt.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "uNJDlX",
                "createdAt": 1664381690416.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "Project Titan",
        "archivedAt": null,
        "isStarred": true,
        "createdAt": 1664381690416,
        "createdBy": {
            "_id": _makeId(),
            "fullname": "Maor Layani",
            "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
        },
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664689530/frank-mckenna-OD9EOzfSOh0-unsplash_eyotjy.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673353048/karsten-winegeart-j5z0DZMWViU-unsplash-min_o3rne4.jpg"
        },
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ],
        "groups": [
            {
                "id": "g201",
                "title": "Backlog-Server",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c201",
                        "title": "Create backend services"
                    },
                    {
                        "id": "c202",
                        "title": "Routing Directory",
                        "memberIds": ["u102"],
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664375512/marvin-meyer-SYTO3xs06fU-unsplash_s7stik.jpg",
                                "fullCover": false
                            }
                        },
                        "desc": "Complete user routing"
                    },
                    {
                        "id": "c203",
                        "title": "Socket implementation",
                        "labelIds": ["l105"],
                        "style": {
                            "bg": {
                                "color": "#ef7564",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        },
                        "desc": "Complete Socket implementation after implementation beckend",
                        "checklists": [
                            {
                                "id": "OBU90u",
                                "title": "Socket implementation todos",
                                "todos": [
                                    {
                                        "id": "AFRdYo",
                                        "title": "Add socket service in backend",
                                        "isDone": true
                                    },
                                    {
                                        "id": "huiFGd",
                                        "title": "Add socket service in frontend",
                                        "isDone": true
                                    },
                                    {
                                        "id": "eT4qdY",
                                        "title": "Add socket to activities",
                                        "isDone": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "c204",
                        "title": "Data Modal Approval",
                        "dueDate": {
                            "date": 16156215211,
                            "isDone": true,
                            "createdAt": 1590999730348
                        },
                    },
                    {
                        "id": "c205",
                        "title": "Create a server with express",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664375608/taylor-vick-M5tzZtFCOfs-unsplash_fh1qzi.jpg",
                                "fullCover": false
                            }
                        },

                    }
                ],
                "style": {}
            },
            {
                "id": "g301",
                "title": "Backlog-Client",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c302",
                        "title": "Add TaskDetails",
                        "labelIds": ["l101", "l103"],
                        "watcedMemberIds": ["u101"],
                    },
                    {
                        "id": "c303",
                        "title": "Adding npm libraries",
                        "labelIds": ["l101", "l103", "l104", "l106"],
                        "memberIds": ["u101", "u103"],
                        "watcedMemberIds": ["u101"]
                    },
                    {
                        "id": "c301",
                        "title": "Planning the components tree",
                        "labelIds": ["l101", "l103", "l104"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watcedMemberIds": ["u101"],
                        "dueDate": {
                            "date": 1664485200000,
                            "isDone": false,
                            "createdAt": 1590999730348
                        },
                        "style": {
                            "bg": {
                                "color": "#7bc86c",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c304",
                        "title": "Build basic template",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664375731/rodion-kutsaev-VKfqHv7qjNs-unsplash_ffegqb.jpg",
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c305",
                        "title": "Implement Sass",
                        "desc": "Build full Sass architecture"
                    }
                ],
                "style": {}
            },
            {
                "id": "g401",
                "title": "In development",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c401",
                        "title": "Functional testing for app header",
                        "labelIds": ["l103", "l104"],
                        "dueDate": {
                            "date": 1664744400000,
                            "isDone": true,
                            "createdAt": 1590999730348
                        },
                        "style": {
                            "bg": {
                                "color": "#ffaf3f",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c402",
                        "title": "Conecting to PWA",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664383563/rahul-chakraborty-xsGxhtAsfSA-unsplash_mxl0ph.jpg",
                                "fullCover": false
                            }
                        },
                    }
                ],
                "style": {}
            },
            {
                "id": "g501",
                "title": "Done",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c501",
                        "title": "CSS variables",
                        "labelIds": ["l101", "l103", "l106"],
                        "memberIds": ["u103"],
                        "style": {
                            "bg": {
                                "color": "#29cce5",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        },
                        "desc": "Create css variables and helpers",
                        "attachments":
                            [
                                {
                                    id: 'at101',
                                    url: "https://www.w3schools.com/css/css3_variables.asp",
                                    urlName: 'nice pic',
                                    addedAt: new Date(),
                                }
                            ]
                    },
                    {
                        "id": "c502",
                        "title": "Making functions and mixins",
                        "labelIds": ["l101", "l105"],
                        "memberIds": ["u102"],
                        "attachments": [
                            { id: 'at102', url: "https://www.w3schools.com/cssref/css_functions.asp", urlName: 'css function', addedAt: new Date() },
                            { id: 'at103', url: "hhttps://www.w3schools.com/sass/sass_mixin_include.php", urlName: 'mixin include', addedAt: new Date() }

                        ]
                    },
                    {
                        "id": "c503",
                        "title": "CSS directory",
                        "dueDate": {
                            "date": 1664139600000,
                            "isDone": true,
                            "createdAt": 1590999730348
                        },
                    },
                    {
                        "id": "c504",
                        "title": "https://www.npmjs.com/package/@material-ui/core",
                    }
                ],
                "style": {}
            },
            {
                "id": "g601",
                "title": "QA",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c601",
                        "title": "Meeting with head manager for planning the code progress",
                        "labelIds": ["l103", "l104"],
                        "desc": "Reviewing and fixing the code before the meeting"
                    },
                    {
                        "id": "c602",
                        "title": "End day code review with all members",
                        "labelIds": ["l103", "l104"],
                        "style": {
                            "bg": {
                                "color": "#29cce5",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c603",
                        "title": "Checking bugs",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664434805/david-pupaza-heNwUmEtZzo-unsplash_cfv5uh.jpg",
                                "fullCover": false
                            }
                        },
                        "attachments": [{ id: 'at104', url: "https://en.wikipedia.org/wiki/Bugs", urlName: 'Bugs', addedAt: new Date() }]
                    },
                    {
                        "id": "c604",
                        "title": "Active from head manager",
                        "labelIds": ["l102", "l104"]
                    },
                    {
                        "id": "c605",
                        "title": "Inspector"
                    },
                    {
                        "id": "c606",
                        "title": "Assets"
                    }
                ],
                "style": {}
            },
            {
                "id": "g701",
                "title": "Ready for production",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c701",
                        "title": "Creating database with mongo",
                        "labelIds": ["l104", "l106"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watcedMemberIds": ["u101"],
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229153/code_mvpcmf.jpg",
                                "fullCover": false
                            }
                        },
                        "desc": "Create a connection to Atlas"
                    },
                    {
                        "id": "c702",
                        "title": "App header",
                        "labelIds": ["l102"],
                        "memberIds": ["u101", "u103"],
                        "watcedMemberIds": ["u101"],
                        "dueDate": {
                            "date": 16156215211,
                            "isDone": false,
                            "createdAt": 1599999730348
                        },
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "txt": "marked the due date on Functional testing for app header incomplete",
                "task": {
                    "id": "c401",
                    "title": ""
                },
                "id": "1QiPDg",
                "createdAt": 1664386021900.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            },
            {
                "task": {
                    "id": "c202",
                    "title": "Routing Directory"
                },
                "txt": "added Maor Layani to",
                "id": "4R3dZ7",
                "createdAt": 1664386019643.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            },
            {
                "task": {
                    "id": "c301",
                    "title": "Planning the components tree"
                },
                "txt": "remove Maor Layani from",
                "id": "BRGswL",
                "createdAt": 1664386013672.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            },
            {
                "txt": "marked the due date on Functional testing for app header complete",
                "task": {
                    "id": "c401",
                    "title": ""
                },
                "id": "Am26u9",
                "createdAt": 1664386005670.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            },
            {
                "txt": "marked the due date on Functional testing for app header incomplete",
                "task": {
                    "id": "c401",
                    "title": ""
                },
                "id": "9oXjL9",
                "createdAt": 1664386004891.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            },
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "cEhhV",
                "createdAt": 1664381690416.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ]
    },
    {
        "title": "Business plan",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196414/ian-dooley-DJ7bWa-Gwks-unsplash_hr2qyq.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673357083/ian-dooley-DJ7bWa-Gwks-unsplash-min_lnhojz.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "gDtYTF",
                "createdAt": 1664382007857.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "Design sprint",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187022/maxim-berg-Tba7ds4aF_k-unsplash_1_woirqi.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356761/maxim-berg-Tba7ds4aF_k-unsplash-min_vzzpcs.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "xmGdh0",
                "createdAt": 1664382101960.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "Personal workout plan",
        "isStarred": true,
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664704915/kelly-sikkema-IZOAOjvwhaM-unsplash_m2ivzg.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356955/kelly-sikkema-IZOAOjvwhaM-unsplash-min_wyhrch.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "jyH8nW",
                "createdAt": 1664382165380.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "My next vacation",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664186705/rrvviiii-EVEHo6gWzSM-unsplash_jqec7i.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358107/rrvviiii-EVEHo6gWzSM-unsplash-min_hsyg7m.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "DIEwN3",
                "createdAt": 1664382260847.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "_id": ObjectId("633475a65cc31f3f3c5169e6"),
        "title": "New Baby todos",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197377/ash-from-modern-afflatus-NQ6Lh81BTRs-unsplash_qoe8no.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673355189/ash-from-modern-afflatus-NQ6Lh81BTRs-unsplash-min_ncx2rj.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "9UH1ew",
                "createdAt": 1664382374891.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ],
        "isStarred": true
    },
    {
        "title": "Marketing overview",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196528/jeremy-thomas-O6N9RV2rzX8-unsplash_ndcnyj.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356416/jeremy-thomas-O6N9RV2rzX8-unsplash-min_wnrfhl.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "Wd7zZS",
                "createdAt": 1664382550504.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "Meal planning",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664382696/katie-smith-uQs1802D0CQ-unsplash_dwxpri.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358315/katie-smith-uQs1802D0CQ-unsplash-min_eorucd.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "EdVySr",
                "createdAt": 1664382656822.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "Daily morning agenda",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664692449/kyle-glenn-_AR74EoWdy0-unsplash_rhf2nb.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358500/kyle-glenn-_AR74EoWdy0-unsplash-min_zkygrg.jpg"

        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "C2FSNb",
                "createdAt": 1664691109624.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "Team away day",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664699079/raphael-biscaldi-7RQf2X6aXXI-unsplash_k6crnk.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358645/raphael-biscaldi-7RQf2X6aXXI-unsplash-min_v67zh8.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "sMQR22",
                "createdAt": 1664698145918.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "_id": ObjectId("633947c5724fcc98dcdc6d2c"),
        "title": "Birthday planning checklist",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664698270/amy-shamblen-pJ_DCj9KswI-unsplash_dpiduu.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358755/amy-shamblen-pJ_DCj9KswI-unsplash-min_bxgvk7.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "MbvOVV",
                "createdAt": 1664698309114.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "title": "Volunteer Program",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664699491/ana-frantz-Pg6YGIJ97lw-unsplash_aj7dr4.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356285/ana-frantz-Pg6YGIJ97lw-unsplash-min_rupmh3.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "v0Pvj6",
                "createdAt": 1664699205123.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "_id": ObjectId("63396d93724fcc98dcdc6d2f"),
        "title": "Remote Team Meetings",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664708145/sigmund-eTgMFFzroGc-unsplash_hg0wdj.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358937/sigmund-eTgMFFzroGc-unsplash-min_rdpz4b.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "BppqhR",
                "createdAt": 1664707987328.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "_id": ObjectId("633a74201d536f6cbba41aae"),
        "title": "Employee onboarding",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664775182/tim-mossholder-GOMhuCj-O9w-unsplash_tq5ffw.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673367958/tim-mossholder-GOMhuCj-O9w-unsplash-min_xxr37z.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "BppqhR",
                "createdAt": 1664707987328.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "_id": ObjectId("633a77ae1d536f6cbba81f75"),
        "title": "Product roadmap",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664776088/michael-cummins-CZ6KeWtaluM-unsplash_turbnt.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673368538/michael-cummins-CZ6KeWtaluM-unsplash-min_t6prlt.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "BppqhR",
                "createdAt": 1624707087328.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664776088/michael-cummins-CZ6KeWtaluM-unsplash_turbnt.jpg"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    },
    {
        "_id": ObjectId("633a97471d536f6cbbcc5d79"),
        "title": "Customer success",
        "style": {
            "bgColor": null,
            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1664784101/sharon-pittaway-iMdsjoiftZo-unsplash_lf1bkq.jpg",
            "thumbUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1673368278/sharon-pittaway-iMdsjoiftZo-unsplash-min_m4zbg5.jpg"
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "BppqhR",
                "createdAt": 1664707087328.0,
                "byMember": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
                }
            }
        ],
        "labels": labelsData,
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03MSPLQ11T-d3d9e810a0d9-72"
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
            }
        ]
    }
]