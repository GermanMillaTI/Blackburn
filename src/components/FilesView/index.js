import { listAll, ref as storeRef, } from "firebase/storage";
import { storage } from "../../firebase/config";
import React, { useState, useEffect, } from 'react';


//allItems[i][0]['name']
//allItems['prefixes']

function FilesView() {
    const [files, setFiles] = useState([]);


    useEffect(() => {
        const fetchFiles = async () => {
            const listRef = storeRef(storage, '/participants');
            const res = await listAll(listRef);
            const allSubfolderPromises = [];

            res.prefixes.forEach((folderRef) => {
                const subRef = storeRef(storage, `${folderRef}`);
                allSubfolderPromises.push(
                    listAll(subRef).then((subRes) => {
                        const subfolderPaths = subRes.prefixes.map((subfolderRef) => subfolderRef.fullPath);
                        return subfolderPaths;
                    })
                );
            });

            const allSubfolders = await Promise.all(allSubfolderPromises);
            const flattenedPaths = allSubfolders.flat();
            console.log(flattenedPaths)
            setFiles(flattenedPaths);
        };

        fetchFiles();
    }, []);


    return <div>
        <table>
            <thead>
                <th>ID</th>
            </thead>
            <tbody>
                {files.length > 0 && files.map((id, i) => {
                    return <tr key={i}>
                        <td>{id}</td>
                    </tr>
                })}
            </tbody>
        </table>

    </div>
};

export default FilesView;