<script>
// @ts-nocheck

    import {page} from "$app/stores";
    const nav = [
        {
            title: "CID Checker",
            path: "/CID-checker-Frontend/"
        },{
            title: "Link replacer",
            path: "/CID-checker-Frontend/link-replacer/"
        }
    ]
</script>

<header>
    <nav>
        <svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
        <ul>
            {#each nav as item}
            <li class:active={$page.url.pathname === item.path}><a href={item.path}>{item.title}</a></li>
            {/each}
        </ul>
        <svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>

        <a href="/CID-checker-Frontend/login/" class="signin">Sign in?</a>
    </nav>
</header>


<style>
    header {
		justify-content: space-between;
	}

    nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

    ul {
        position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
    }
    li {
        margin-right: 1em;
        font-weight: bold;
        position: relative;
    }

    li a {
        text-decoration: none;
        font-weight: 700;
		
    }
    li:hover {
        text-decoration: underline;
    }
    
    li.active::before {
		--size: 7px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: -11px;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}
    li.active a {
        text-decoration: underline;
    }

    svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

    .signin {

    }
</style>