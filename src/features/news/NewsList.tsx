import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useTranslation } from 'react-i18next';  // Import the useTranslation hook
import '../../App.css';

const NewsList = () => {
  const { t } = useTranslation();  // Initialize the translation function
  const { newsStore } = useStore();
  const { loadNews, newsById, loadingInitial, error } = newsStore;

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  if (loadingInitial) return <div>{t('loading')}</div>;  // Replace static text with translation key
  if (error) return <div>{t('error_message', { error })}</div>;  // Replace static text with translation key

  return (
    <div className="container">
      <h2>{t('news')}</h2>  {/* Replace static text with translation key */}
      <div className="row">
        {newsById.map(newsItem => (
          <div className="col-md-4" key={newsItem.id}>
            <div className="card mb-4 shadow-sm">
              <img src={newsItem.image} className="card-img-top" alt={newsItem.title} />
              <div className="card-body">
                <h5 className="card-title">{newsItem.title}</h5>
                <p className="card-text">{newsItem.description}</p>
                {newsItem.link && (
                  <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="link">
                    {t('read_more')}  {/* Replace static text with translation key */}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(NewsList);
