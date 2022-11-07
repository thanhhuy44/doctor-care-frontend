import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout({ children }) {
    return (
        <div className="overflow-hidden">
            <div className="bg-white">
                <Header />
            </div>
            <div className="mt-[80px] min-h-[70vh] relative">{children}</div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
