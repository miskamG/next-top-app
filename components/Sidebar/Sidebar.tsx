import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
// import { Menu } from '../Menu/Menu';
// import { Search } from '../../components';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
	return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <img src="/logo.svg" alt="" />
			{/* <Search /> */}
			{/* <Menu /> */}
		</div>
	);
};