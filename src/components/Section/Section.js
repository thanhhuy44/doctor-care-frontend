function Section({ bgColor, children }) {
    return (
        <div className="block" style={{ backgroundColor: `${bgColor}` }}>
            <div className="container mx-auto py-5 ">
                <div className="content mx-3">{children}</div>
            </div>
        </div>
    );
}

export default Section;
