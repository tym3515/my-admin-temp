import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Loading extends React.Component
{
	constructor(props)
	{
		super(props);
		this.timer = null;
	}

	state ={
		prg : 0
	};

	componentDidMount()
	{
		if (this.props.progress)
		{
			this.timer = setInterval(() =>
			{ // 设置定时器
				if (this.state.prg >= 100)
				{ // 到达终点，关闭定时器
					clearInterval(this.timer);
					this.setState({
						prg : 100
					});
				}
				else
				{ // 未到终点，进度自增
					this.setState({
						prg : this.state.prg + Math.ceil(10 * Math.random())
					});
				}
			}, 100);
		}
	}

	componentWillUnmount()
	{
		clearInterval(this.timer);
	}

	render()
	{
		// const { prg } = this.state;
		const { load, noFull, loadMask, text } = this.props;

		return (
			<Fragment>
				<div data-component='Loading' className={classnames('loader', {
					nobg     : load,
					loadMask : loadMask,
					noFull   : noFull
				})}
				>
					{/*<Choose>*/}
					{/*	<When condition={!progress}>*/}
							<div className='loader-inner line-spin-fade-loader'>
								<div className={'box'}>
									<div />
									<div />
									<div />
									<div />
									<div />
									<div />
									<div />
									<div />
								</div>
								<p className={'load-text'}>{text}</p>
							</div>
						{/*</When>*/}
						{/*<Otherwise>*/}
					{/*		<div className={'Progress'}>*/}
					{/*			<Progress*/}
					{/*				strokeColor={{*/}
					{/*					from : '#1D1D1D',*/}
					{/*					to   : '#4A4949'*/}
					{/*				}}*/}
					{/*				percent={prg}*/}
					{/*				status='active'*/}
					{/*			/>*/}
					{/*		</div>*/}
					{/*	</Otherwise>*/}
					{/*</Choose>*/}
				</div>
			</Fragment>
		);
	}
}

Loading.propTypes =
{
	text     : PropTypes.string,
	load     : PropTypes.bool,
	noFull   : PropTypes.bool,
	progress : PropTypes.bool,
	loadMask : PropTypes.bool
};

Loading.defaultProps =
{
	load     : false,
	noFull   : false,
	loadmask : false,
	progress : false
};

// const mapStateToProps = (state, { load, noFull, progress, loadMask }) =>
// {
// 	const { room } = state;
//
// 	return {
// 		load     : load,
// 		noFull   : noFull || room.noFull,
// 		progress : progress || room.progress,
// 		loadMask : loadMask || room.loadMask
// 	};
// };
//
// const LoadingContainer = connect(
// 	mapStateToProps
// )(Loading);

export default Loading;
