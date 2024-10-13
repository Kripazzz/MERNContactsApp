import React, { useEffect, useState } from 'react';
import './AllContact.css';

const AllContact = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/mycontacts`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                if (!result.error) {
                    setContacts(result.contacts);
                } else {
                    console.log(result);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchContacts(); // Call the async function
    }, []); // Empty dependency array to run only on mount

    return (
        <>
            <div className="jumbotron">
                <h1 className="display-4">Your Contacts</h1>
                <p className="lead">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact._id}>
                                    <th scope="row">{contact.name}</th>
                                    <td>{contact.address}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </p>
            </div>
        </>
    );
};

export default AllContact;




















// import React, { useEffect, useState } from 'react';

// import './AllContact.css'
// // import { Contact } from '../../../server/models/Contact';

// const AllContact = () => {

//     const [ contacts, setContacts ] = useState([]);
   

//     useEffect( async () => {
//         try {
//             const res = await fetch(`http://localhost:8000/api/mycontacts`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    
//                 },
//             });
//             const result = await res.json();
//             if(!result.error) {
//                setContacts(result.contacts);

//             }else{
//                 console.log(result);
//             }
//         } catch (error) {
//             console.log(error);
            
//         }
//     })

//   return(
//   <>
//   <div className="jumbotron">
//   <h1 className="display-4">Your Contacts</h1>
  
//   <p className="lead">

//   <table className="table table-hover">
//   <thead>
//     <tr>
//       <th scope="col">NAME</th>
//       <th scope="col">Address</th>
//       <th scope="col">Email</th>
//       <th scope="col">Phone</th>
//     </tr>
//   </thead>
//   <tbody>
//     {contacts.map((Contact)  => (

   
//     // <tr className="table-active">
//     <tr key={Contact._id}>
//       <th scope="row">{Contact.name}</th>
//       <td>{Contact.address}</td>
//       <td>{Contact.email}</td>
//       <td>{Contact.phone}</td>
//     </tr> 
// ))}
    
//   </tbody>
// </table>
 
//   </p>
// </div>
// </>
//   )

// }

// export default AllContact;