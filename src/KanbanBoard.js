
import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';
import { fetchData } from './api';
import Avatar from './components/Avatar';
import Ticket from './components/Ticket';

const KanbanBoard = () => {
    const [groupBy, setGroupBy] = useState(() => {
        return localStorage.getItem('selectedGroupBy') || 'userId';
    });
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);

    const handleGroupByChange = (e) => {
        const selectedGroupBy = e.target.value;
        setGroupBy(selectedGroupBy);

        localStorage.setItem('selectedGroupBy', selectedGroupBy);
    };

    useEffect(() => {
        fetchData()
            .then((apiData) => {
                if (apiData) {
                    setTickets(apiData.tickets);
                    setUsers(apiData.users);
                }
            });
    }, []);

    const mappedData = tickets.map((item) => {
        const userDetail = users.find((user) => user.id === item.userId);
        console.log("detu", userDetail);
        return {
            ...item,
            username: userDetail ? userDetail.name : 'Unknown User',
            available: userDetail.available
        };
    });

    const groupedData = {};
    mappedData.forEach((item) => {
        const key = item[groupBy];
        if (!groupedData[key]) {
            groupedData[key] = [];
        }
        groupedData[key].push(item);
    });

    for (const group in groupedData) {
        groupedData[group].sort((a, b) => {
            return +parseInt(b.priority) - parseInt(a.priority);
        });
    }
    console.log(groupedData);

    const userMap = {}
    const priorityMap = {}

    users.forEach((user) => {
        userMap[user.id] = user.name;
    })

    console.log(userMap);

    priorityMap["0"] = "No Priority";
    priorityMap["1"] = "Low";
    priorityMap["2"] = "Medium";
    priorityMap["3"] = "High";
    priorityMap["4"] = "Urgent";


    return (
        <div className='wrapper'>

            <div className="kanban-board">
                <div className="group-by">
                    <label>Grouping  </label>
                    <select value={groupBy} onChange={handleGroupByChange}>
                        <option value="userId">User</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>

                <div className="ticket-container">
                    {Object.keys(groupedData).map((group) => (
                        <div key={group} className="column">

                            <div className='group-head'> {groupBy === "priority" ? priorityMap[group] : groupBy === "userId" ? userMap[group] : group}
                                <span className='count'>{groupedData[group].length}</span>
                            </div>
                            {groupedData[group].map((item) => (
                                <Ticket key={item.name} ticket={item} groupBy={groupBy} />
                            ))
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};




export default KanbanBoard;
