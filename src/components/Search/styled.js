import styled from "styled-components";

export const SearchWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: opacity 0.4s;
    .ais-Hits-list {
        display: grid;
        justify-content: space-between;
        grid-gap: 30px;
        grid-template-columns: 1fr 1fr 1fr;
        @media (max-width: 980px) {
            grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 680px) {
            grid-template-columns: 1fr;
        }
    }
    .ais-Hits-item {
        list-style: none;
    }
    .ais-InstantSearch__root {
        display: flex;
        flex-direction: column;
        height: auto;
        width: 100%;
    }
    .ais-SearchBox,
    .ais-Stats {
        padding: 0.5rem 3rem;
    }
    .ais-SearchBox {
        padding-top: 6rem;
    }
    .ais-Stats {
        color: #8899a6;
    }
    .ais-SearchBox-input {
        background: none;
        border: none;
        border-bottom: 1px solid #ccc;
        color: #8899a6;
        display: flex;
        font-size: 1.6rem;
        padding: 0.5rem;
        width: 100%;
        transition: border 1s;
        &::placeholder {
            color: #ccc;
        }
        &:focus {
            border-bottom: 1px solid #38444d;
            color: #8899a6;
            &::placeholder {
                color: #8899a6;
            }
        }
    }
    .ais-SearchBox-submit,
    .ais-SearchBox-reset {
        display: none;
    }
`;
