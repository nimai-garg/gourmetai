import openai

# Make sure to set your OpenAI API key
openai.api_key = 'sk-proj-8AZWAIqvStj7BioLukFeT3BlbkFJV4LAip8PLsLsOfJ48Zly'

def get_chatgpt_response(prompt):
    response = openai.Completion.create(
        model="gpt-4o-mini-2024-07-18",
        prompt=prompt,
        max_tokens=200,
        temperature=0.7
    )
    return response.choices[0].text.strip()