import openai

# Make sure to set your OpenAI API key
openai.api_key = 'sk-proj-8AZWAIqvStj7BioLukFeT3BlbkFJV4LAip8PLsLsOfJ48Zly'

def get_chatgpt_response(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
    )
    return response.choices[0].message['content'].strip()