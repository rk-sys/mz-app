<template>
	<div class="nav-bar-profile">
		<div class="nav-bar-profile__search">
			<div class="icon"
			     @mouseenter="searchHover = true"
			     @mouseleave="searchHover = false"
			     :class="searchHover? 'icon-search--green' : 'icon-search'">
			</div>
		</div>

		<div class="nav-bar-profile__user">
			<mz-dropdown trigger="click"
			             class="nav-bar-profile__user--sign-in">

				<div class="icon"
				     @mouseenter="userHover = true"
				     @mouseleave="userHover = false"
				     :class="userHover? 'icon-user--green':'icon-user'"></div>

				<template v-if="this.$store.state.global.currentUser !== null">
					<mz-nav-bar-account-sign-in/>
				</template>

				<template v-else>
					<mz-nav-bar-account-not-sign-in/>
				</template>
			</mz-dropdown>
		</div>

		<div class="nav-bar-profile__basket">

			<div class="icon "
			     @mouseenter="basketHover = true"
			     @mouseleave="basketHover = false"
			     :class="basketHover? 'icon-shopping-cart--green':'icon-shopping-cart'"></div>
		</div>
	</div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import mzLogo from "@/components/logo/logo.component.vue";
    import mzDropdown from "@/components/commons/dropdown/dropdown.component.vue";
    import mzDropdownMenu from "@/components/commons/dropdown-menu/dropdown-menu.component.vue";
    import mzDropdownItem from "@/components/commons/dropdown-item/dropdown-item.component.vue";
    import mzNavBarAccountSignIn from "@/components/nav-bar/components/navbar-account-sign-in.component.vue";
    import mzNavBarAccountNotSignIn from "@/components/nav-bar/components/navbar-account-not-sign-in.component.vue";

    @Component({
        components: {
            mzLogo,
            mzDropdown,
            mzDropdownMenu,
            mzDropdownItem,
            mzNavBarAccountSignIn,
            mzNavBarAccountNotSignIn
        },
    })
    export default class mzNavBarProfile extends Vue {
        public searchHover = false;
        public userHover = false;
        public basketHover = false;
    };
</script>

<style lang="scss"
       scoped>
	.nav-bar-profile {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0;

		&__basket,
		&__user,
		&__search {
			height: 100%;
			display: flex;
			align-items: center;
			padding: 0 2rem;
			text-decoration: none;
			color: var(--black);
			font-weight: var(--font-medium);

			.icon {
				height: 2.2rem;
				width: 2.2rem;

				&:hover {
					cursor: pointer;
				}
			}
		}
	}
</style>
