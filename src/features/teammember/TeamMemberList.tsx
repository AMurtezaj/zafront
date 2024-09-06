import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useTranslation } from 'react-i18next';
import '../../App.css';

const TeamMemberList = () => {
  const { t } = useTranslation();
  const { teamMemberStore } = useStore();
  const { teamMembers, loadTeamMembers, loading, error } = teamMemberStore;

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error_message', { error })}</div>;

  const topRowMembers = teamMembers.slice(0, 2);
  const otherMembers = teamMembers.slice(2);

  return (
    <div className="team-container">
      <h2 className="team-title1">{t('team_members')}</h2>
      <div className="team-top-row">
        {topRowMembers.map(member => (
          <div className="team-col" key={member.id}>
            <div className="team-card">
              <img src={member.image} className="team-img" alt={member.name} />
              <div className="team-body">
                <h4 className="team-name">{member.name}</h4>
                <h3 className="team-title">{member.title}</h3>
                <h3 className="team-position">{member.position}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="team-bottom-grid">
        {otherMembers.map(member => (
          <div className="team-col" key={member.id}>
            <div className="team-card">
              <img src={member.image} className="team-img" alt={member.name} />
              <div className="team-body">
                <h4 className="team-name">{member.name}</h4>
                <h3 className="team-title">{member.title}</h3>
                <h3 className="team-position">{member.position}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(TeamMemberList);

/* import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useTranslation } from 'react-i18next';
import '../../App.css';

const TeamMemberList = () => {
  const { t } = useTranslation();
  const { teamMemberStore } = useStore();
  const { teamMembers, loadTeamMembers, loading, error } = teamMemberStore;

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error_message', { error })}</div>;

  const topRowMembers = teamMembers.slice(0, 2);
  const otherMembers = teamMembers.slice(2);

  return (
    <div className="team-container">
      <h2 className="team-title1">{t('team_members')}</h2>
      <div className="team-top-row">
        {topRowMembers.map(member => (
          <div className="team-col" key={member.id}>
            <div className="team-card">
              <img src={member.image} className="team-img" alt={member.name} />
              <div className="team-body">
                <h4 className="team-name">{member.name}</h4>
                <h3 className="team-title">{t(`titles.${member.title}`)}</h3>
                <h3 className="team-position">{t(`positions.${member.position}`)}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="team-bottom-grid">
        {otherMembers.map(member => (
          <div className="team-col" key={member.id}>
            <div className="team-card">
              <img src={member.image} className="team-img" alt={member.name} />
              <div className="team-body">
                <h4 className="team-name">{member.name}</h4>
                <h3 className="team-title">{t(`titles.${member.title}`)}</h3>
                <h3 className="team-position">{t(`positions.${member.position}`)}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(TeamMemberList);
*/