import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import HeaderManagement from '../components/HeaderManagement';

function ManagementLayout({ children }) {
    return (
        <div className="bg-slate-300 relative">
            <div className="container mx-auto">
                <div className="fixed top-0 left-0 right-0 z-[999]">
                    <HeaderManagement />
                </div>
                <div className="mt-[80px] flex items-start bg-slate-300 overflow-y-auto relative z-0 min-h-[100vh]">
                    <div className="overflow-hidden min-h-[100vh] bg-gray-300">
                        <Sidebar />
                    </div>
                    <div className="flex-1 my-5 mx-10 z-0">{children}</div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ManagementLayout;
