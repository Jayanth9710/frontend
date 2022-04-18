import {useState,useEffect} from 'react';
import axios from 'axios'
import './Sidebar.css'
import { Link } from 'react-router-dom';
import env from '../../Settings'

export default function Sidebar() {
    const [cats,setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get(`${env.api}/categories`);
            setCats(res.data)
        }
        getCats()
    },[] )
    return (
        <div className="sidebar">
            <div className="sidebar__item">
            <span className="sidebar__title"> About Offsider</span>
            <img></img>
            <p>Offsider is a contemporary blogging website for people who are keen to know more of the world we live in !</p>
            </div>
            

        </div>
    )
}
