import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import HeaderManagement from '../components/HeaderManagement';
import { useState } from 'react';

function ManagementLayout({ children }) {
    const [displaySidebar, setDisplaySidebar] = useState(false);

    return (
        <div className="bg-slate-300 relative">
            <div className="mx-auto">
                <div className="fixed top-0 left-0 right-0 z-[999]">
                    <HeaderManagement
                        displaySidebar={() => {
                            setDisplaySidebar(!displaySidebar);
                        }}
                    />
                </div>
                <div className="mt-[80px] flex items-start bg-slate-300 relative z-0">
                    <div
                        className={`fixed w-[250px] top-[80px] left-0 bottom-0 bg-gray-300 z-50 ${
                            displaySidebar ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0 duration-300`}
                    >
                        <Sidebar />
                    </div>

                    <div className="flex-1 my-5 md:ml-[250px] z-0 overflow-y-auto min-h-[100vh]">
                        <div className="container mx-auto px-5 min-h-[60vh]">{children}</div>
                        <div className="block">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementLayout;
