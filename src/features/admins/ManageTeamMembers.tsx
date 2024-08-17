// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { Link, useNavigate } from 'react-router-dom';
// import { useStore } from '../../app/stores/store';
// import '../../App.css';

// const ManageTeamMembers = () => {
//   const { teamMemberStore } = useStore();
//   const { teamMembers, loadTeamMembers, deleteTeamMember, loading } = teamMemberStore;
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadTeamMembers();
//   }, [loadTeamMembers]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="container">
//       <h2>Manage Team Members</h2>
//       <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/add-team-member')}>Add Team Member</button>
//       <div className="row">
//         {teamMembers.map(member => (
//           <div className="col-md-4" key={member.id}>
//             <div className="card mb-4 shadow-sm">
//               <img src={member.image} className="card-img-top" alt={member.name} />
//               <div className="card-body">
//                 <h5 className="card-title">{member.name}</h5>
//                 <p className="card-text">{member?.title}</p>
//                 <p className="card-text">{member?.position}</p>
//                 <button className="btn btn-danger" onClick={() => deleteTeamMember(member.id)}>Delete</button>
//                 <Link className="btn btn-primary" to={`/admin/edit-team-member/${member.id}`}>Edit</Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default observer(ManageTeamMembers);

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import '../../App.css';

const ManageTeamMembers = () => {
  const { teamMemberStore } = useStore();
  const { teamMembers, loadTeamMembers, deleteTeamMember, loading } = teamMemberStore;
  const navigate = useNavigate();

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="management-container">
      <h2 className="management-title">Manage Team Members</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/add-team-member')}>Add Team Member</button>
      <div className="team-grid">
        {teamMembers.map(member => (
          <div className="team-card" key={member.id}>
            <img src={member.image} className="card-img-top" alt={member.name} />
            <div className="card-body">
              <h5 className="card-title">{member.name}</h5>
              <p className="card-text">{member?.title}</p>
              <p className="card-text">{member?.position}</p>
              <div className="button-group">
                <button className="btn btn-danger" onClick={() => deleteTeamMember(member.id)}>Delete</button>
                <Link className="btn btn-primary" to={`/admin/edit-team-member/${member.id}`}>Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(ManageTeamMembers);