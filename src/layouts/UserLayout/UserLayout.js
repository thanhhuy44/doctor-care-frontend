import Header from '../components/Header';

function UserLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
        </div>
    );
}

export default UserLayout;
