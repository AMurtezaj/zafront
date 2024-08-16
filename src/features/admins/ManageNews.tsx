import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import '../../App1.css';

const ManageNews = () => {
  const { newsStore } = useStore();
  const { newsById, loadNews, deleteNews, loading } = newsStore;
  const navigate = useNavigate();

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  if (loading) return <div>Loading...</div>;

  console.log("News to display: ", newsById);

  return (
    <div className="container">
      <h2>Manage News</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/add-news')}>Add News</button>
      <div className="row">
        {newsById.map(news => (
          <div className="col-md-4" key={news.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text">{news.description}</p>
                {news.link && (
                    <a href={news.link} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  )}
                <button className="btn btn-danger" onClick={() => deleteNews(news.id)}>Delete</button>
                <Link className="btn btn-primary" to={`/admin/edit-news/${news.id}`}>Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(ManageNews);
