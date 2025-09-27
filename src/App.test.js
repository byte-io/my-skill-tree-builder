import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import SidePanel from "./components/SidePanel";

test("renders Create Skill Tree Builder link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Create Skill Tree Builder/i);
  expect(linkElement).toBeInTheDocument();
});

describe("SidePanel", () => {
  test("renders form with all required fields", () => {
    const mockSetNodes = jest.fn();
    const mockSetEdges = jest.fn();

    render(<SidePanel setNodes={mockSetNodes} setEdges={mockSetEdges} />);

    expect(screen.getByLabelText(/Name:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Level:/)).toBeInTheDocument();
    expect(screen.getByText("Add Skill")).toBeInTheDocument();
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  test("updates form data when user types in inputs", () => {
    const mockSetNodes = jest.fn();
    const mockSetEdges = jest.fn();

    render(<SidePanel setNodes={mockSetNodes} setEdges={mockSetEdges} />);

    const nameInput = screen.getByLabelText(/Name:/);
    const descriptionInput = screen.getByLabelText(/Description:/);
    const levelInput = screen.getByLabelText(/Level:/);

    fireEvent.change(nameInput, { target: { value: "JavaScript" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Programming language" },
    });
    fireEvent.change(levelInput, { target: { value: "5" } });

    expect(nameInput.value).toBe("JavaScript");
    expect(descriptionInput.value).toBe("Programming language");
    expect(levelInput.value).toBe("5");
  });

  test("calls setNodes with correct data when form is submitted", () => {
    const mockSetNodes = jest.fn();
    const mockSetEdges = jest.fn();

    render(<SidePanel setNodes={mockSetNodes} setEdges={mockSetEdges} />);

    const nameInput = screen.getByLabelText(/Name:/);
    const descriptionInput = screen.getByLabelText(/Description:/);
    const levelInput = screen.getByLabelText(/Level:/);
    const submitButton = screen.getByText("Add Skill");

    fireEvent.change(nameInput, { target: { value: "React" } });
    fireEvent.change(descriptionInput, {
      target: { value: "JavaScript library" },
    });
    fireEvent.change(levelInput, { target: { value: "3" } });

    fireEvent.click(submitButton);

    expect(mockSetNodes).toHaveBeenCalledWith(expect.any(Function));
  });

  test("clears form fields after successful submission", () => {
    const mockSetNodes = jest.fn();
    const mockSetEdges = jest.fn();

    render(<SidePanel setNodes={mockSetNodes} setEdges={mockSetEdges} />);

    const nameInput = screen.getByLabelText(/Name:/);
    const descriptionInput = screen.getByLabelText(/Description:/);
    const levelInput = screen.getByLabelText(/Level:/);
    const submitButton = screen.getByText("Add Skill");

    fireEvent.change(nameInput, { target: { value: "Vue.js" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Progressive framework" },
    });
    fireEvent.change(levelInput, { target: { value: "4" } });

    fireEvent.click(submitButton);

    expect(nameInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
    expect(levelInput.value).toBe("");
  });

  test("calls setNodes and setEdges when Clear All button is clicked", () => {
    const mockSetNodes = jest.fn();
    const mockSetEdges = jest.fn();

    render(<SidePanel setNodes={mockSetNodes} setEdges={mockSetEdges} />);

    const clearAllButton = screen.getByText("Clear All");

    fireEvent.click(clearAllButton);

    expect(mockSetNodes).toHaveBeenCalledWith([]);
    expect(mockSetEdges).toHaveBeenCalledWith([]);
  });

  test("displays error message when error prop is provided", () => {
    const mockSetNodes = jest.fn();
    const mockSetEdges = jest.fn();
    const errorMessage = "Something went wrong!";

    render(
      <SidePanel
        setNodes={mockSetNodes}
        setEdges={mockSetEdges}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass("error-message");
  });

  test("does not display error message when error prop is null", () => {
    const mockSetNodes = jest.fn();
    const mockSetEdges = jest.fn();

    render(
      <SidePanel setNodes={mockSetNodes} setEdges={mockSetEdges} error={null} />
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
