import React, { PureComponent } from 'react';
import Text from 'potluckyum-shared/src/components/primitives/Text';

class HeaderTitle extends PureComponent {
	render() {
		return (
			<Text fontWeight='bold' {...this.props} />
		);
	}
}

export default HeaderTitle;
