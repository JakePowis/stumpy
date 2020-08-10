import React, { useState, useRef } from 'react';
import './App.css'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const axios = require('axios');


export default function FILE_UPLOAD() {


    const [file, setFile] = useState(null)

    const [base64, setBase64] = useState(null)

    const [fileUrl, setFileUrl] = useState(null)

    const [serverMsg, setServerMsg] = useState("")

    const textAreaRef = useRef(null);

    const inputRef = useRef(null);

    const previewRef = useRef(null);

    console.log("file:", file)

    //spinner
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: none;`;

    // const style = { position: "fixed", top: "35%", left: "50%" };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (file == "") {
                setFile("none")
                return
            }

            setFileUrl("loading")

            const reader = await new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async function () {
                console.log("base64:", reader.result);
                setBase64(reader.result)
                let base = reader.result


                const res = await fetch(process.env.REACT_APP_API_URL + '/api/url/upload', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ base }),
                }
                );
                console.log("sent")

                //once back, set fileUrl or error msg
                const parseData = await res.json()

                setFileUrl(parseData.fileUrl)

                setServerMsg(parseData.msg)

                // inputRef.current.src = "test"

                console.log("res", parseData)


            };




        }
        catch (error) {
            console.log(error.message)
        }
    }

    function copyToClipboard(e) {
        console.log(textAreaRef)
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    };

    const clear = () => {

        setFile(null)
        setFileUrl(null)
        inputRef.current.value = "";
    }



    return (
        <div>
            <div>
                <div className="subText">HOST ANY IMAGE</div>
                <form className="urlForm" onSubmit={handleSubmit}>
                    <label>
                        File to upload:
          <input ref={inputRef} className="fileUpload" type="file" id="myFile" name="filename" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <input className="btn btn-primary" type="submit" value="stump it" />
                </form>



                {fileUrl === "none" ? <div div className="text-center text-danger my-3">please select a file to host</div> :
                    fileUrl === "loading" ?
                        <div className="text-center my-5">
                            <ClipLoader
                                css={override}
                                size={40}
                                color={"blue"}
                            />
                        </div> :
                        fileUrl ?
                            <div className="text-center results">
                                <div className="my-3">Your new stumpy URL:</div>
                                <a href={fileUrl} target="blank"><textarea className="mt-3 text-primary textA" ref={textAreaRef} value={fileUrl}>{fileUrl}</textarea></a>
                                <div>
                                    <a href={fileUrl} target="blank"> <img ref={previewRef} src={base64} className="mb-3" height="200" alt="Image preview..."></img></a>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary copy" onClick={copyToClipboard}>Copy URL</button>


                                    <button className="btn btn-warning copy ml-1" onClick={clear}>Clear</button>
                                </div>
                            </div>
                            : <div className="text-danger text-center my-3">{serverMsg}</div>
                }


            </div>
        </div>
    )
}
