// CONFIG IMPORTS
import { useHistory } from 'react-router';

const ArticleCard = ({ articleData }) => {
  const {title, nutritionist, id,created_at} = articleData;
  const history = useHistory();


const truncateString = (str, num)=> {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
  
  const createDate = (el) => {
    let date = new Date(el);
    return date.toLocaleDateString("fr", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
  };

  return (
    <div className="col-3 article-card-content mx-1 my-3">
      <div className="img-box">
        <i className="fas fa-newspaper"></i>
        <h6 className="card-title">{truncateString(title,100)}</h6>
      </div>
      <div className="card_body">
        <div>
          <h5
            className="author"
            onClick={() =>
              history.push(`/nutritionists/${nutritionist.last_name}`)
            }
          >
            Par {nutritionist.first_name} {nutritionist.last_name}
          </h5>
          <h6>{createDate(created_at)}</h6>
        </div>
        <p
          className="btn third-button"
          onClick={() => history.push(`/article/${id}`)}
        >
          En savoir plus
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;