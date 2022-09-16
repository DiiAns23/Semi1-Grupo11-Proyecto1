// React
import { connect } from "react-redux";
// Components
import Login from "../components/modals/Login";
//import ShowAlbum from "../components/modals/ShowAlbum";
//import Gallery from "../components/containers/Gallery";
// Styles
//import "../public/assets/css/pages/Home.scss"

function Home(props) {
  
    return (
    <div className="Home">
      <h1> Home </h1>
    </div>
    );
  }

  const mapStateToProps = state => {
    return {
      user: state.user,
    };
    
};

export default connect(mapStateToProps, null)(Home);