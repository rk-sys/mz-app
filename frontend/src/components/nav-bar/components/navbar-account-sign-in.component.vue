<template>
	<mz-dropdown-menu slot="dropdown"
	                  class="nav-bar-account-sign-in">

		<div class="nav-bar-account-sign-in__account">
			<img src="https://via.placeholder.com/60"
			     alt="avatar"
			     class="picture"/>

			<span class="name"
			      v-if="this.$store.state.global.currentUser.name">
				{{ this.$store.state.global.currentUser.name}}
			</span>
		</div>

		<div class="separator">{{$t(`navBar.account`)}}</div>

		<mz-dropdown-item class="nav-bar-account-sign-in__item">{{$t(`navBar.settings`)}}</mz-dropdown-item>
		<mz-dropdown-item class="nav-bar-account-sign-in__item">{{$t(`navBar.myItems`)}}</mz-dropdown-item>
		<mz-dropdown-item class="nav-bar-account-sign-in__item">{{$t(`navBar.message`)}}</mz-dropdown-item>

		<div class="separator">{{$t(`navBar.manage`)}}</div>

		<mz-dropdown-item class="nav-bar-account-sign-in__item"
		                  @click.native="logout">
			{{$t(`navBar.logout`)}}
		</mz-dropdown-item>
	</mz-dropdown-menu>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import mzDropdown from "@/components/commons/dropdown/dropdown.component.vue";
    import mzDropdownMenu from "@/components/commons/dropdown-menu/dropdown-menu.component.vue";
    import mzDropdownItem from "@/components/commons/dropdown-item/dropdown-item.component.vue";


    @Component({
        components: {
            mzDropdown,
            mzDropdownMenu,
            mzDropdownItem
        },
    })
    export default class mzNavBarAccountSignIn extends Vue {

    };

</script>

<style lang="scss" scoped>

	.nav-bar-account-sign-in {
		border-radius: 0.2rem;
		min-width: 24rem;

		&__item {
			font-size: 1.5rem;

			&:hover {
				background: var(--primary-color);
				color: var(--white);
			}
		}

		&__account {
			pointer-events: none;
			padding: 0 2rem;
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin: 1rem 0;
			font-size: 1.5rem;

			.picture {
				border-radius: 50%;
				max-width: 5rem;
				max-height: 5rem;
			}
		}
	}

	.separator {
		min-width: 100%;
		background: var(--gray-150);
		margin: .4rem 0;
		color: var(--black);
		font-weight: var(--font-medium);
		font-size: 1.4rem;
		padding: 0.8rem;
	}
</style>
