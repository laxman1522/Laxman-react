import CommonComment from './components/Comments';
import ApprovalCard from './components/ApprovalCard';
import './style/App.css';

function App() {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <CommonComment author="laxis1" timeAgo="Today at 6.00pm" comments="Wow!!!" src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Avatar_%282009_film%29_poster.jpg/220px-Avatar_%282009_film%29_poster.jpg"/>
      </ApprovalCard>
      <ApprovalCard>
        <CommonComment author="laxis2" timeAgo="Today at 2.00pm" comments="Nice!!!" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Avatar_The_Way_of_Water_poster.jpg/220px-Avatar_The_Way_of_Water_poster.jpg"/>
      </ApprovalCard>
      <ApprovalCard>
        <CommonComment author="laxis3" timeAgo="Today at 8.00am" comments="Awsome!!!" src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Avatar_%282009_film%29_poster.jpg/220px-Avatar_%282009_film%29_poster.jpg"/>
      </ApprovalCard>
    </div>
  );
}

export default App;
