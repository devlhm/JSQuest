import {
	LinkText,
	NavContainer,
	NavItem,
	LastItem,
	NavNav,
	NavLink,
	HomeIcon,
	MaterialsIcon,
	ConfigIcon,
	HorizontalLine,
	ProfileIcon,
	NavButton,
} from "./Navbar.styles";
import { TestPopup } from "../Popups";
import { fireSignal } from "../../game/signals";

export function Navbar() {
	return (
		<>
			<TestPopup></TestPopup>
			<NavContainer>
				<NavNav>
					<NavItem mInvisible>
						<NavLink to={"/home"}>
							<HomeIcon />
							<LinkText>Home</LinkText>
						</NavLink>
					</NavItem>
					<HorizontalLine mInvisible />
					<NavItem>
						<NavLink to={"/home"}>
							<ProfileIcon />
							<LinkText>Perfil</LinkText>
						</NavLink>
					</NavItem>
					<HorizontalLine dInvisible />
					<NavItem>
						<NavLink to={"/home"}>
							<MaterialsIcon />
							<LinkText>Materiais</LinkText>
						</NavLink>
					</NavItem>
					<HorizontalLine dInvisible />
					<LastItem
						onClick={() => {
							fireSignal("configPopupCall", true);
						}}
					>
						<NavButton>
							<ConfigIcon rotation={+true} />
							<LinkText>Configurações</LinkText>
						</NavButton>
					</LastItem>
				</NavNav>
			</NavContainer>
		</>
	);
}
