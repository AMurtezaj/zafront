import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { News } from '../models/News';

export default class NewsStore {
  news: News[] = [];
  selectedNews: News | undefined = undefined;
  loading = false;
  error: string | null = null;
  newsRegistry = new Map<number, News>();
  editMode = false;
  loadingInitial = false;
  constructor() {
    makeAutoObservable(this);
  }

  get newsById() {
    return Array.from(this.newsRegistry.values()).sort((a, b) => Number(a.id) - Number(b.id));
  } 

  
  loadNews = async () => {
    this.loadingInitial = true;
    try {
        const news = await agent.NewsApi.getAll();
        runInAction(() => {
            news.forEach(newsItem => {
                this.setNews(newsItem);
            });
        });
    } catch (error) {
        console.log(error);
    } finally {
        runInAction(() => {
            this.loadingInitial = false;
        });
    }
  }

  loadNewsItem = async (id: number) => {
      let news = this.getNews(id);
      if (news) {
          this.selectedNews = news;
          return news;
      } else {
          this.loadingInitial = true;
          try {
              news = await agent.NewsApi.getById(id);
              runInAction(() => {
                  this.selectedNews = news;
                  this.setNews(news!);
              });
              return news;
          } catch (error) {
              console.log(error);
          } finally {
              runInAction(() => {
                  this.loadingInitial = false;
              });
          }
      }
  }

  createNews = async (news: FormData) => {
    this.setLoading(true);
    try {
      await agent.NewsApi.create(news);
      await this.loadNews();
    } catch (error: any) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      this.setLoading(false);
    }
  };

  
  updateNews = async (news: FormData) => {
    this.loading = true;
    try {
        await agent.NewsApi.update(news);
        runInAction(() => {
            this.loadNews();
        });
    } catch (error) {
        console.log(error);
    } finally {
        runInAction(() => {
            this.loading = false;
        });
    }
  }

  deleteNews = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.NewsApi.delete(id);
      runInAction(() => {
        this.news = this.news.filter(n => n.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error deleting news';
      });
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(state: boolean) {
    runInAction(() => {
      this.loading = state;
    });
  }

  private getNews = (id: number) => {
    return this.newsRegistry.get(id);
  }

  private setNews = (news: News) => {
      this.newsRegistry.set(news.id!, news);
  }
}
