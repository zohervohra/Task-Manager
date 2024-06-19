import React, { useState } from "react";
import NoteContext from "./noteContext";



// here we are using the useContext hook to pass the state (data) to any component without any difficulty
const NoteState = (props) => {


    const host = 'https://task-manager-production-7563.up.railway.app'
    let notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    const getAllNotes = async () => {

        let url = `${host}/api/notes/fetchAllNotes`
        const response = await fetch(url, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            }


        });
        let json =  await response.json()
        console.log(json);
        setNotes(json)
    }
  

    // add a note
    const addNote = async (note) => {
        const { title, tag } = note
     
        // to do api call 
  
        let url = `${host}/api/notes/addNote`
        const response = await fetch(url, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description : "pending", tags : tag}),

        });

        const json = await response.json();
        let id = json._id
        // console.log(json)
        let tempnote = [
            {
                "_id": id,
                "user": "65b0eaeef2017a2281bc93da",
                "title": title,
                "description": "status",
                "tags": tag,
                "date": "Thu Jan 25 2024 16:58:33 GMT+0530 (India Standard Time)",
                "__v": 0
            }
        ]
        setNotes(notes.concat(tempnote))
    }

    // delete a note 
    const deleteNote = async (id) => {


        let url = `${host}/api/notes/deleteNote/${id}`
        const response = await fetch(url, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify(),

        });

        const json = await response.json();
        // console.log(json)

        console.log('deleting note with id ', id)
        let newNotes = notes.filter((note) => {
            return note.id !== id
        })
        setNotes(newNotes)
    }

    // // edit a note
    const editNote = async (note) => {
      let  { id, title , description} = note
      console.log(note , id , title , 'in edit note')

        let url = `${host}/api/notes/updateNote/${id}`
        const response = await fetch(url, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description: description, tag : "tag"}),

        });

        const json = response.json();
        // console.log(json)

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index]
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag

            }
        }


    }

    return (
        // in the value variable we are sending the data and the function which can be accessed by any component
        <NoteContext.Provider value={{ notes, setNotes,  getAllNotes , addNote  , deleteNote , editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;