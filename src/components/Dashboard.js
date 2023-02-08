import React from 'react'

const Dashboard = (props) => {
    return (
        <div>
            <iframe src="http://im.imama.kr/imama/dashboard/" className="w-full h-[90vh]"></iframe>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode
}

export default React.memo(Dashboard, comparisonFn)
