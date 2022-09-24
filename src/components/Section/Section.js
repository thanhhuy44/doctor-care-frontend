function Section({ bgColor, children }) {
    return (
        <div className="block" style={{ backgroundColor: `${bgColor}` }}>
            <div className="container mx-auto flex flex-nowrap flex-col py-[48px] ">
                <div className="content mx-3">{children}</div>
            </div>
        </div>
    );
}

export default Section;
