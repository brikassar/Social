import React from "react";
import { create } from "react-test-renderer";
import ProfileStatusHook from "./ProfileStatusHook";


describe("ProfileStatus component", () => {

    test("Status from state should be in the state", () => {
        const component = create(<ProfileStatusHook profileStatus="Polina2022" />);
        const instance = component.getInstance();
        expect(instance.state.profileStatus).toBe("Polina2022");
    });

    test("After creating span should be displayed with status", () => {
        const component = create(<ProfileStatusHook profileStatus="Polina2022" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.length).toBe(1);
    });



});